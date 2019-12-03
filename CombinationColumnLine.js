/*
{
	dimensions: [
		{
			name: '',
			path: ''
		}
	],
	measures: [
		{
			name: '',
			path: '',
			shape: 'bar/line'
		},
		{
			name: '',
			path: '',
			shape: 'bar/line'
		}
	],
	data: [{}],
	popover: true
}
*/
sap.ui.define(['./ChartBase'], function(Base) {
	'use strict';

	return class Column extends Base {
		constructor(mSettings) {
			mSettings.type = 'info/combination';

			super(mSettings);

			var { measures } = mSettings;

			this.getVizFrame().setVizProperties({
				plotArea: {
					dataShape: {
						primaryAxis: measures.map(function(elt) {
							return elt.shape;
						})
					}
				}
			});
		}
	};
});
