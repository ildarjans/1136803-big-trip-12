import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import AbstractView from './abstract.js';
import {TRANSPORT_TYPES, ACTIVITY_TYPES} from '../consts.js';
import {
  getEventDurationInMinutes,
  convertMsInHours,
} from '../utils/date.js';


function renderMoneyChart(ctx, points) {
  const pointTypesDict = [...ACTIVITY_TYPES, ...TRANSPORT_TYPES]
    .reduce((accum, type) => Object.assign(accum, {[type]: 0}), {});

  points.forEach((point) => {
    const cost = point.point.base_price;
    pointTypesDict[point.point.type] += cost;
  });

  const pointTypes = [];
  const pointCosts = [];
  Object
    .entries(pointTypesDict)
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
  const pointTypesDict = [...ACTIVITY_TYPES, ...TRANSPORT_TYPES]
    .reduce((accum, type) => Object.assign(accum, {[type]: 0}), {});

  points.forEach((point) => {
    const dateFrom = point.point.date_from;
    const dateTo = point.point.date_to;
    const duration = getEventDurationInMinutes(dateFrom, dateTo);
    pointTypesDict[point.point.type] += duration;
  });

  const pointTypes = [];
  const pointTime = [];
  Object
    .entries(pointTypesDict)
    .forEach(([key, value]) => {
      if (value > 0) {
        pointTypes.push(key);
        pointTime.push(convertMsInHours(value));
      }
    });
  return new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: pointTypes,
      datasets: [
        {
          data: pointTime,
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
  const transportDict = TRANSPORT_TYPES.reduce((accum, type) => Object.assign(accum, {[type]: 0}), {});

  points.forEach((point) => transportDict[point.point.type] >= 0 ? ++transportDict[point.point.type] : ``);
  const transportTypes = [];
  const transportCount = [];
  Object
    .entries(transportDict)
    .forEach(([key, value]) => {
      if (value > 0) {
        transportTypes.push(key);
        transportCount.push(value);
      }
    });

  return new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: transportTypes,
      datasets: [
        {
          data: transportCount,
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
