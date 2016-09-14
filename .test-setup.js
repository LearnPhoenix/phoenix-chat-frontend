const noop = () => {}
const empty = () => ({})

require.extensions['.css'] = empty
require.extensions['.ico'] = noop
require.extensions['.png'] = noop
require.extensions['.jpg'] = noop
require.extensions['.svg'] = noop
