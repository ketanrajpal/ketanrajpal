const airtable = require("airtable");
airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.AIRTABLE_API_KEY,
});
var base = airtable.base("appwXxMRhgGdZYuqM");
const lodash = require("lodash");

const WebConfigurations = (callback) => {
  const RecordArray = [];
  base("web configurations")
    .select({
      sort: [{ field: "serial", direction: "asc" }],
    })
    .eachPage(
      (records, fetchNextPage) => {
        records.forEach((record) => {
          RecordArray.push(record.fields);
        });
        fetchNextPage();
      },
      (error) => {
        if (error) console.error(error);
        callback(RecordArray);
      }
    );
};

const Technology = (callback) => {
  const RecordArray = [];
  base("technology")
    .select()
    .eachPage(
      (records, fetchNextPage) => {
        records.forEach((record) => {
          RecordArray.push(record.fields);
        });
        fetchNextPage();
      },
      (error) => {
        if (error) console.error(error);
        callback(RecordArray);
      }
    );
};

const Employment = (callback) => {
  const RecordArray = [];
  base("employment")
    .select({
      sort: [{ field: "serial", direction: "asc" }],
    })
    .eachPage(
      (records, fetchNextPage) => {
        records.forEach((record) => {
          RecordArray.push(record.fields);
        });
        fetchNextPage();
      },
      (error) => {
        if (error) console.error(error);
        callback(RecordArray);
      }
    );
};

const Awards = (callback) => {
  const RecordArray = [];
  base("awards")
    .select({
      sort: [{ field: "position", direction: "asc" }],
    })
    .eachPage(
      (records, fetchNextPage) => {
        records.forEach((record) => {
          RecordArray.push(record.fields);
        });
        fetchNextPage();
      },
      (error) => {
        if (error) console.error(error);
        callback(RecordArray);
      }
    );
};

const Education = (callback) => {
  const RecordArray = [];
  base("education")
    .select({
      sort: [{ field: "serial", direction: "asc" }],
    })
    .eachPage(
      (records, fetchNextPage) => {
        records.forEach((record) => {
          RecordArray.push(record.fields);
        });
        fetchNextPage();
      },
      (error) => {
        if (error) console.error(error);
        callback(RecordArray);
      }
    );
};

const FollowMe = (callback) => {
  const RecordArray = [];
  base("follow me")
    .select({
      sort: [{ field: "serial", direction: "asc" }],
    })
    .eachPage(
      (records, fetchNextPage) => {
        records.forEach((record) => {
          RecordArray.push(record.fields);
        });
        fetchNextPage();
      },
      (error) => {
        if (error) console.error(error);
        callback(RecordArray);
      }
    );
};

const TechnologyTemplate = (Technology, Label, content) => {
  Technology = lodash.filter(Technology, (key) => {
    return key.type === Label;
  });
  Technology = lodash.orderBy(Technology, ["serial"], ["asc"]);
  content += `* **${Label}** :point_right: `;
  Technology.forEach((record, index) => {
    if (Technology.length - 1 === index) content += `and `;
    if (record.important) content += `**${record.name}**`;
    else content += `${record.name}`;
    if (Technology.length - 1 > index) content += `, `;
  });
  content += `
`;
  return content;
};

module.exports = { WebConfigurations, Employment, Awards, Education, FollowMe, Technology, TechnologyTemplate };
