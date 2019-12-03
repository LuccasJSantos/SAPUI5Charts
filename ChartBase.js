sap.ui.define(
	[
		'sap/viz/ui5/controls/Popover',
		'sap/viz/ui5/controls/VizFrame',
		'sap/viz/ui5/data/FlattenedDataset',
		'sap/viz/ui5/controls/common/feeds/FeedItem'
	],
	function(Popover, VizFrame, FlattenedDataset, FeedItem) {
		return class ChartBase {
			constructor(mSettings) {
				var id = mSettings.id ? mSettings.id : null;
				if (id) {
					this.oVizFrame = new VizFrame({
						id: id,
						uiConfig: { applicationSet: 'fiori' }
					});
				} else {
					this.oVizFrame = new VizFrame({
						uiConfig: { applicationSet: 'fiori' }
					});
				}

				this.setPopover.call(this, mSettings);
				this.setVizProperties.call(this, mSettings);
				this.setVizType.call(this, mSettings);
				this.setModel.call(this, mSettings);
				this.setDataset.call(this, mSettings);
				this.setFeedItems.call(this, mSettings);
			}

			setPopover({ popover }) {
				if (!popover) return;

				this.oPopover = new Popover({
					customDataControl: popover.dataHandler
						? popover.dataHandler.bind(this)
						: null
				});

				this.oPopover.connect(this.getVizFrame().getVizUid());
			}

			getVizFrame() {
				return this.oVizFrame;
			}

			getPopover() {
				return this.oPopover;
			}

			updateData(oData) {
				this.oModel.setData(oData);
				this.oModel.updateBindings();
			}

			setVizProperties({ measures }) {
				this.oVizFrame.setVizProperties({
					plotArea: {
						dataLabel: {
							visible: true
						},
						colorPalette: measures.map(
							function(elt, i) {
								return elt.color ? elt.color : this.getColor(i);
							}.bind(this)
						)
					},
					title: {
						visible: false,
						text: ''
					}
				});

				this.oVizFrame.setWidth('100%');
			}

			getColor(i) {
				return [
					'#748CB2',
					'#9CC677',
					'#EACF5E',
					'#F9AD79',
					'#D16A7C',
					'#8873A2',
					'#3A95B3',
					'#B6D949',
					'#FDD36C',
					'#F47958',
					'#A65084',
					'#0063B1',
					'#0DA841',
					'#FCB71D',
					'#F05620',
					'#B22D6E',
					'#3C368E',
					'#8FB2CF',
					'#95D4AB',
					'#EAE98F',
					'#F9BE92',
					'#EC9A99',
					'#BC98BD',
					'#1EB7B2',
					'#73C03C',
					'#F48323',
					'#EB271B',
					'#D9B5CA',
					'#AED1DA',
					'#DFECB2',
					'#FCDAB0',
					'#F5BCB4'
				][i];
			}

			setVizType({ type }) {
				this.oVizFrame.setVizType(type);
			}

			setModel({ data }) {
				const oModel = new sap.ui.model.json.JSONModel(data);

				this.oVizFrame.setModel(oModel);

				if (!this.oModels) {
					this.oModels = {};
				}

				this.oModel = oModel;

				return oModel;
			}

			setDataset({ dimensions, measures, model }) {
				const mapper = function(elt) {
					return {
						name: elt.name,
						value: `{${elt.path}}`
					};
				};

				const oFlattenedDataset = new FlattenedDataset({
					dimensions: dimensions.map(mapper),
					measures: measures.map(mapper),
					data: {
						path: '/'
					}
				});

				this.oVizFrame.setDataset(oFlattenedDataset);

				this.oFlattenedDataset = oFlattenedDataset;

				return oFlattenedDataset;
			}

			setFeedItems({ dimensions, measures }) {
				function setDimensions(dimensions) {
					const oFeedItem = new FeedItem({
						uid: 'categoryAxis',
						type: 'Dimension',
						values: dimensions.map(function(elt) {
							return elt.name;
						})
					});

					this.oVizFrame.addFeed(oFeedItem);

					if (!this.aFeedItem) {
						this.aFeedItem = [];
					}

					this.aFeedItem.push(oFeedItem);
				}

				function setMeasures(measures) {
					const oFeedItem = new FeedItem({
						uid: 'valueAxis',
						type: 'Measure',
						values: measures.map(function(elt) {
							return elt.name;
						})
					});

					this.oVizFrame.addFeed(oFeedItem);

					if (!this.aFeedItem) {
						this.aFeedItem = [];
					}

					this.aFeedItem.push(oFeedItem);
				}

				setDimensions.call(this, dimensions);
				setMeasures.call(this, measures);
			}
		};
	}
);
