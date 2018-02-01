const { Collector, Reporter } = require('istanbul');

after(function() {
    const collector = new Collector();
    collector.add(global.__coverage__);

    const reporter = new Reporter();
    reporter.addAll(['text-summary', 'json']);
    reporter.write(collector, true, () => {});
});
