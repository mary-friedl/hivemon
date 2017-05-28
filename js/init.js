let { HiveRepository } = require('./repository');
let { HiveMonitor } = require('./monitor');
let { HiveApi } = require('./api');


let repository = new HiveRepository().init();
let monitor = new HiveMonitor(repository, 5000, console.log);
let api = new HiveApi(repository);

repository
    .setSensor(
        { name: 'hiveTemperature', displayName: 'Hive temperature' },
        { name: 'piloTemperature', displayName: 'Pilo temperature' },
        { name: 'light', displayName: 'Light' },
        { name: 'humidity', displayName: 'Humidity' }
    )
    .setDevice(
        'all',
        { name: 'hive0', url: '0.0.0.0', location: 'Sofia', displayName: 'Hive 0' },
        { name: 'hive1', url: '0.0.0.1', location: 'Sofia', displayName: 'Hive 1' }
    )
    .addSensorData('hive0', 'light', 600, new Date())
    .addSensorData('hive0', 'hiveTemperature', 10, new Date())
    .addSensorData('hive0', 'humidity', [1,2,3], new Date());

let port = 3000;
console.log(`Monitoring and api (port: ${ port }) initiated...`);
monitor.start();
api.start(port);