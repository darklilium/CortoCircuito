// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.17/esri/copyright.txt for details.
//>>built
define("esri/layers/SnapshotMode","dojo/_base/declare dojo/_base/lang dojo/has ../kernel ../SpatialReference ../tasks/query ./RenderMode".split(" "),function(e,f,m,n,p,q,r){e=e([r],{declaredClass:"esri.layers._SnapshotMode",constructor:function(a){this.featureLayer=a;this.pagination=a.queryPagination;this._featureMap={};this._drawFeatures=f.hitch(this,this._drawFeatures);this._queryErrorHandler=f.hitch(this,this._queryErrorHandler)},startup:function(){this.pagination=this.pagination&&null!=this.featureLayer.maxRecordCount;
this.featureLayer._collection?this._applyTimeFilter():this._fetchAll()},propertyChangeHandler:function(a){this._init&&(a?this.featureLayer._collection?console.log("FeatureLayer: layer created by value (from a feature collection) does not support definition expressions and time definitions. Layer id \x3d "+this.featureLayer.id):this._fetchAll():this._applyTimeFilter())},drawFeature:function(a){var d=a.attributes[this.featureLayer.objectIdField];this._addFeatureIIf(d,a);this._incRefCount(d)},resume:function(){this.propertyChangeHandler(0)},
refresh:function(){var a=this.featureLayer;a._collection?(a._fireUpdateStart(),a._refresh(!0),a._fireUpdateEnd()):this._fetchAll()},_getRequestId:function(a){return("_"+a.name+a.layerId+a._ulid).replace(/[^a-zA-Z0-9\_]+/g,"_")},_fetchAll:function(){var a=this.featureLayer;!a._collection&&!a.suspended&&(a._fireUpdateStart(),this._clearIIf(),this._sendRequest())},_sendRequest:function(a){var d=this.map,b=this.featureLayer,e=b.getDefinitionExpression(),c=new q;c.outFields=b.getOutFields();c.where=e||
"1\x3d1";c.returnGeometry=!0;c.outSpatialReference=new p(d.spatialReference.toJson());c.timeExtent=b.getTimeDefinition();c.maxAllowableOffset=b._maxOffset;c.quantizationParameters=b._quantizationParameters;b._ts&&(c._ts=(new Date).getTime());c.orderByFields=b.supportsAdvancedQueries?b.getOrderByFields():null;c.multipatchOption=b.multipatchOption;this.pagination&&(this._start=c.start=null==a?0:a,c.num=b.maxRecordCount);var h;b._usePatch&&(h=this._getRequestId(b),this._cancelPendingRequest(null,h));
b._task.execute(c,this._drawFeatures,this._queryErrorHandler,h)},_drawFeatures:function(a){this._purgeRequests();var d=a.features,b=this.featureLayer,e=b.objectIdField,c,h=d.length,f=a.exceededTransferLimit&&!b._collection,m=b._selectedFeatures,n=b.mode===b.constructor.MODE_AUTO,k,g,l;b._sortFeatures(d);for(c=0;c<h;c++)g=d[c],l=g.attributes[e],k=this._addFeatureIIf(l,g),this._incRefCount(l),n&&(k!==g&&m[l])&&(k.setGeometry(g.geometry),k.setAttributes(g.attributes));this._applyTimeFilter(!0);if(!this.pagination||
!f)b._fireUpdateEnd(null,a.exceededTransferLimit?{queryLimitExceeded:!0}:null);f&&(this.pagination&&this._sendRequest(this._start+b.maxRecordCount),b.onQueryLimitExceeded())},_queryErrorHandler:function(a){this._purgeRequests();var d=this.featureLayer;d._errorHandler(a);d._fireUpdateEnd(a)}});m("extend-esri")&&f.setObject("layers._SnapshotMode",e,n);return e});