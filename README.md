# SAPUI5Charts
Making the life a lil' bit easier

First of all, add the following namespaces to the view in which the charts will be used.

xmlns:viz="sap.viz.ui5.controls" 
xmlns:viz.feeds="sap.viz.ui5.controls.common.feeds" 
xmlns:viz.data="sap.viz.ui5.data"

reference the chart in the define function params.

***Column Chart***
Use sample:

```

sap.ui.define([
  '../library/SAPUI5Charts/Column'
], function (oColumn) ...);

.
.
.

var oColumn = new ColumnChart({
  id: 'chartId',
  dimensions: [
    {
      name: 'Month',
      path: 'month'
    }
  ],
  measures: [
    {
      name: 'Price',
      path: 'price',
      color: '#F00' // not required
    },
    {
      name: 'Price (taxes)',
      path: 'priceTax'
    }
  ],
  data: [
    {
      month: 'jan/19',
      price: '12.00',
      priceTax: '14.99'
    },
    {
      month: 'fev/19',
      price: '22.00',
      priceTax: '25.69'
    }
  ]
});

this.getView().byId('pageControl').addContent(oColumn.getVizFrame());
```

***Stacked Combination Column Line Chart***
Use sample:

```
sap.ui.define([
  '../library/SAPUI5Charts/StackedCombinationColumnLine'
], function (oStacked) ...);

.
.
.

var oStacked = new Stacked({
  dimensions: [
    {
      name: 'Month',
      path: 'month'
    }
  ],
  measures: [
    {
      name: 'Price',
      path: 'price',
      shape: 'bar',
      color: '#FF0'
    },
    {
      name: 'Price (taxes)',
      path: 'priceTax',
      shape: 'bar'
    },
    {
      name: 'Deviation',
      path: 'deviation',
      shape: 'line',
      color: '#AA78FF'
    }
  ],
  data: [
    {
      month: 'jan/19',
      price: '12.00',
      priceTax: '14.99',
      deviation: '13.88'
    },
    {
      month: 'fev/19',
      price: '22.00',
      priceTax: '25.69',
      deviation: '27.28'
    }
  ]
});

this.getView().byId('pageControl').addContent(oStacked.getVizFrame());
```
