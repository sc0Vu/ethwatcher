const tape = require('tape');
const log = require('../../lib/log');

tape('lib/log', (t) => {
  t.test('instance type', (st) => {
    // logger
    st.equals(typeof log.logger, 'object');

    // methods
    st.equals(typeof log.info, 'function');
    st.equals(typeof log.debug, 'function');
    st.equals(typeof log.warn, 'function');
    st.equals(typeof log.error, 'function');
    st.end();
  });
});