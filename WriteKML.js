var builder = require('xmlbuilder')
var fs = require('fs')
module.exports = function (Boats) {
    xmlbuilder(Boats)
}



function xmlbuilder(Boats) {
    var root = builder.create('kml', {
        encoding: 'utf-8'
    }).att('xmlns', 'http://www.opengis.net/kml/2.2').att('xmlns:gx', "http://www.google.com/kml/ext/2.2")
    var Document = root.ele('Document')

    Boats.forEach(boat => {
        let Folder = Document.ele("Folder")
        Folder.ele("name",{}, boat.rows[0].MMSI)
        Folder.ele("open",{}, 1)
        let LookAt = Folder.ele("LookAt")
        LookAt.ele("longitude",{}, -157)
        LookAt.ele("latitude",{}, 21)
        LookAt.ele("altitude", {}, 0)
        LookAt.ele("range",{}, 4060590.093687469)
        LookAt.ele("heading", {}, -3)
        LookAt.ele("tilt",{}, 0)
        Folder.ele("Style").ele("ListStyle").ele("listItemType",{},"checkHideChildren")
        let Track = Folder.ele('Placemark').ele("gx:Track")

        boat.rows.forEach(row => {
            Track.ele("when",{}, row.BaseDateTime)
        });
        boat.rows.forEach(row => {
            Track.ele("gx:coord",{}, row.LON + " " + row.LAT+ " " + 0)
        });
        

    });

    var xml = root.end({
        pretty: true
    })
    fs.writeFileSync('./KML/BoatsKML' + '.kml', xml)
}