const db = require('./db_connect');

module.exports.getAllMentors = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  db.getAll('mentor')
    .then(res => {
      callback(null, {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(res)
      });
    })
    .catch(e => {
      console.log(e);
      callback(null, {
        statusCode: e.statusCode || 500,
        body: 'Error: Could not find Mentors: ' + e
      });
    });
};

module.exports.createMentor = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const data = JSON.parse(event.body);
  db.insert('mentor', data)
    .then(res => {
      callback(null, {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(res)
      });
    })
    .catch(e => {
      callback(null, {
        statusCode: e.statusCode || 500,
        body: 'Could not create Mentor ' + e
      });
    });
};

module.exports.deleteMentor = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  db.deleteById('mentor', event.pathParameters.id)
    .then(res => {
      callback(null, {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: 'Mentor Deleted!'
      });
    })
    .catch(e => {
      callback(null, {
        statusCode: e.statusCode || 500,
        body: 'Could not delete Mentor ' + e
      });
    });
};

module.exports.updateMentor = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const data = JSON.parse(event.body);
  db.updateById('mentor', event.pathParameters.id, data)
    .then(res => {
      callback(null, {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(data)
      });
    })
    .catch(e => {
      callback(null, {
        statusCode: e.statusCode || 500,
        body: 'Could not update Mentor ' + e
      });
    });
};

module.exports.getMentor = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  db.getById('mentor', event.pathParameters.id)
    .then(res => {
      callback(null, {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(res)
      });
    })
    .catch(e => {
      callback(null, {
        statusCode: e.statusCode || 500,
        body: 'Could not find Mentor: ' + e
      });
    });
};
