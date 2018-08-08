const chai = require('chai');
const expect = chai.expect;
const partners = require("../partners.json");
const myMethods = require('../partnerFinder');
const getClosestPartners = require('../partnerFinder').getClosestPartners;
const calcDistance = require('../partnerFinder').calcDistance;
const convertDeg2Rad = require('../partnerFinder').convertDeg2Rad;

// Home locations
const latBanbury = 52.0629009;
const lonBanbury = -1.3397750000000315;

describe('calcDistance function', () => {

    it("converts degrees to radians", () => {
      const expected =  [0.9086690388423, -0.023383484985849571636];
      const latBanburyRadian = convertDeg2Rad(latBanbury);
      const lonBanburyRadian = convertDeg2Rad(lonBanbury);
      expect(latBanburyRadian.toFixed(11)).to.equal(expected[0].toFixed(11));
      expect(lonBanburyRadian.toFixed(11)).to.equal(expected[1].toFixed(11));
    });

    it('should return the distance between two coordinates in km', () => {
        const a = { lat: 51.515419, lng: -0.141099 }
        const b = { lat: -33.8934219, lng: 151.20404600000006 };
        const distance = 16996.054413094975;
        const calculated = calcDistance(a, b);
        expect(calculated.toFixed(10)).to.equal(distance.toFixed(10));
    });

    it('should return undefined if any of the objects passed to it does not contain lat or lng property', () => {
        const a = { notlat: 51.515419, lng: -0.141099 }
        const b = { lat: -33.8934219, lng: 151.20404600000006 };
        const distance1 = calcDistance(a, b);

        const c = { lat: 51.515419, notlng: -0.141099 }
        const d = { lat: -33.8934219, lng: 151.20404600000006 };
        const distance2 = calcDistance(c, d);

        const e = { lat: 51.515419, lng: -0.141099 }
        const f = { notlat: -33.8934219, lng: 151.20404600000006 };
        const distance3 = calcDistance(e, f);

        const g = { lat: 51.515419, lng: -0.141099 }
        const h = { lat: -33.8934219, notlng: 151.20404600000006 };
        const distance4 = calcDistance(g, h);

        expect(distance1).to.equal(undefined);
        expect(distance2).to.equal(undefined);
        expect(distance3).to.equal(undefined);
        expect(distance4).to.equal(undefined);
    });

    it('should return undefined if lat or lng property of objects are not numbers', () => {
        const a = { lat: "no", lng: -0.141099 }
        const b = { lat: -33.8934219, lng: 151.20404600000006 };
        const distance1 = calcDistance(a, b);

        const c = { lat: 51.515419, lng: "no" }
        const d = { lat: -33.8934219, lng: 151.20404600000006 };
        const distance2 = calcDistance(c, d);

        const e = { lat: 51.515419, lng: -0.141099 }
        const f = { lat: "no", lng: 151.20404600000006 };
        const distance3 = calcDistance(e, f);

        const g = { lat: 51.515419, lng: -0.141099 }
        const h = { lat: -33.8934219, lng: "no" };
        const distance4 = calcDistance(g, h);

        expect(distance1).to.equal(undefined);
        expect(distance2).to.equal(undefined);
        expect(distance3).to.equal(undefined);
        expect(distance4).to.equal(undefined);
    });

});


const mockPartners = [
  {
    "id": 1,
    "urlName": "balance-at-work",
    "organization": "Balance at Work",
    "customerLocations": "across Australia, Pacific and Oceania",
    "willWorkRemotely": true,
    "website": "http://www.balanceatwork.com.au/",
    "services": "At Balance at Work, we want to help you make work a joy for your employees and you! We specialize in leadership development, talent management and career coaching, and use Spidergap as one of our tools to help employees focus their development and achieve more.",
    "offices": [
      {
        "location": "Sydney, Australia",
        "address": "Suite 1308, 109 Pitt St \nSydney 2000",
        "coordinates": "-33.8934219,151.20404600000006"
      }
    ]
  },
  {
    "id": 13,
    "urlName": "gallus-consulting",
    "organization": "Gallus Consulting",
    "customerLocations": "across the UK",
    "willWorkRemotely": true,
    "website": "http://www.gallusconsulting.com/",
    "services": "We're strategy consultants with a difference - we work with organisations and their leaders to take them from strategy to reality. In our work with leaders we often use 360-degree feedback to identify capability gaps, improve self-awareness, and develop strategic and cultural alignment. Our aim is for believe-able leaders to emerge with the drive, capability and cultural fit to take strategy to reality.",
    "offices": [
      {
        "location": "Northampton",
        "address": "Newton House, Northampton Science Park, Moulton Park, Kings Park Road, Northampton, NN3 6LG",
        "coordinates": "52.277409,-0.877935999999977"
      },
      {
        "location": "London",
        "address": "No1 Royal Exchange, London, EC3V 3DG",
        "coordinates": "51.5136102,-0.08757919999993646"
      },
      {
        "location": "Manchester",
        "address": "3 Hardman Square, Spinningfields, Manchester, M3 3EB",
        "coordinates": "53.47990859999999,-2.2510892999999896"
      }
    ]
  },
  {
    "id": 4,
    "urlName": "blue-square-360",
    "organization": "Blue Square 360",
    "customerLocations": "globally",
    "willWorkRemotely": true,
    "website": "http://www.bluesquare360.com/",
    "services": "Blue Square 360 provides a professionally managed service covering all areas of a 360Â° Feedback initiative. We're experienced in supporting projects of all sizes, and always deliver a personal service that provides the level of support you need to ensure your 360 initiative delivers results for the business.",
    "offices": [
      {
        "location": "Singapore",
        "address": "Ocean Financial Centre, Level 40, 10 Collyer Quay, Singapore, 049315",
        "coordinates": "1.28304,103.85199319999992"
      },
      {
        "location": "London, UK",
        "address": "St Saviours Wharf, London SE1 2BE",
        "coordinates": "51.5014767,-0.0713608999999451"
      }
    ]
  }
];

describe('getClosestPartners function', () => {

	it('should return names and addresses of partners that are within 100km of Central London', () => {
    const shouldReturn = 
      {
        "name": "Gallus Consulting",
        "addresses": [
            {
                "location": "Northampton",
                "address": "Newton House, Northampton Science Park, Moulton Park, Kings Park Road, Northampton, NN3 6LG",
                "coordinates": "52.277409,-0.877935999999977"
            },
            {
                "location": "London",
                "address": "No1 Royal Exchange, London, EC3V 3DG",
                "coordinates": "51.5136102,-0.08757919999993646"
            },
            {
                "location": "Manchester",
                "address": "3 Hardman Square, Spinningfields, Manchester, M3 3EB",
                "coordinates": "53.47990859999999,-2.2510892999999896"
            }
        ]
      };
    const result = getClosestPartners(mockPartners);
    expect(result[0].name).to.equal(shouldReturn.name)
    expect(result[0].addresses).to.eql(shouldReturn.addresses[0].address);
	});

	it('should sort the list of partners according to the company name in ascending order', () => {
    const shouldReturn = 
      {
        "name": "Gallus Consulting",
        "addresses": [
          "Newton House, Northampton Science Park, Moulton Park, Kings Park Road, Northampton, NN3 6LG, Northampton",
          "No1 Royal Exchange, London, EC3V 3DG, London"
        ]
      };
    const result = getClosestPartners(mockPartners);
    expect(result[0].name).to.equal(shouldReturn.name);
 
	});
});