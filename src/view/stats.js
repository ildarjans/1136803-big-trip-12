import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import AbstractView from './abstract.js';
import {TRANSPORT_TYPES, ACTIVITY_TYPES} from '../consts.js';
import {
  getEventDurationInMinutes,
  convertMsInHours,
} from '../utils/date.js';


function getTypeCounterDictionary(...types) {
  const result = {};
  types.forEach((type) => {
    result[type.toLowerCase()] = 0;
  });
  return result;
}

function renderMoneyChart(ctx, points) {
  const typesDictionary = getTypeCounterDictionary(...ACTIVITY_TYPES, ...TRANSPORT_TYPES);

  points.forEach((point) => {
    typesDictionary[point.type] += point.basePrice;
  });

  const pointTypes = [];
  const pointCosts = [];
  Object
    .entries(typesDictionary)
    .forEach(([key, value]) => {
      if (value > 0) {
        pointTypes.push(key);
        pointCosts.push(value);
      }
    });
  return new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: pointTypes,
      datasets: [
        {
          data: pointCosts,
          backgroundColor: `#1ad6f9`,
          hoverBackgroundColor: `#18bad8`,
          anchor: `start`,
        },
      ],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `€ ${val}`,
        },
      },
      title: {
        display: true,
        text: `MONEY`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: `#000000`,
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            barThickness: 44,
          },
        ],
        xAxes: [
          {
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            minBarLength: 50,
          },
        ],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
}

function renderSpentTimeChart(ctx, points) {
  const typesDictionary = getTypeCounterDictionary(...ACTIVITY_TYPES, ...TRANSPORT_TYPES);

  points.forEach((point) => {
    const dateFrom = point.dateFrom;
    const dateTo = point.dateTo;
    const duration = getEventDurationInMinutes(dateFrom, dateTo);
    typesDictionary[point.type] += duration;
  });

  const pointTypes = [];
  const pointTimes = [];
  Object
    .entries(typesDictionary)
    .forEach(([key, value]) => {
      if (value > 0) {
        pointTypes.push(key);
        pointTimes.push(convertMsInHours(value));
      }
    });
  return new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: pointTypes,
      datasets: [
        {
          data: pointTimes,
          backgroundColor: `#5c4eff`,
          hoverBackgroundColor: `#4636e2`,
          anchor: `start`,
        },
      ],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}H`,
        },
      },
      title: {
        display: true,
        text: `SPENT TIME`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: `#000000`,
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            barThickness: 44,
          },
        ],
        xAxes: [
          {
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            minBarLength: 50,
          },
        ],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
}

function renderTransportChart(ctx, points) {
  const typesDictionary = getTypeCounterDictionary(...TRANSPORT_TYPES);

  points.forEach((point) => typesDictionary[point.type] >= 0 ? ++typesDictionary[point.type] : ``);
  const transportTypes = [];
  const transportCounts = [];
  Object
    .entries(typesDictionary)
    .forEach(([key, value]) => {
      if (value > 0) {
        transportTypes.push(key);
        transportCounts.push(value);
      }
    });

  return new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: transportTypes,
      datasets: [
        {
          data: transportCounts,
          backgroundColor: `#ffffff`,
          hoverBackgroundColor: `#ffffff`,
          anchor: `start`,
        },
      ],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}x`,
        },
      },
      title: {
        display: true,
        text: `TRANSPORT`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: `#000000`,
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            barThickness: 44,
          },
        ],
        xAxes: [
          {
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            minBarLength: 50,
          },
        ],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
}

export default class StatsView extends AbstractView {
  constructor(points) {
    super();
    this._points = points;

    this._moneyChart = null;
    this._transportChart = null;

    this._setCharts();
  }

  _getTemplate() {
    return (
      `<section class="statistics">
      <h2 class="visually-hidden">Trip statistics</h2>

      <div class="statistics__item statistics__item--money">
        <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--transport">
        <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--time-spend">
        <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
      </div>
    </section>`
    );
  }

  _setCharts() {
    if (this._transportChart || this._moneyChart || this._timeSpendChart) {
      this._transportChart = null;
      this._moneyChart = null;
      this._timeSpendChart = null;
    }

    const transportCtx = this.getElement().querySelector(`.statistics__chart--transport`).getContext(`2d`);
    const moneyCtx = this.getElement().querySelector(`.statistics__chart--money`).getContext(`2d`);
    const timeCtx = this.getElement().querySelector(`.statistics__chart--time`).getContext(`2d`);

    this._transportChart = renderTransportChart(transportCtx, this._points);
    this._moneyChart = renderMoneyChart(moneyCtx, this._points);
    this._timeSpendChart = renderSpentTimeChart(timeCtx, this._points);
  }
}
