## Initializers Spec
This folder is kept at the top of the directory with a preceding `_` because we need these tests to run before all others.
By turning off randomization in `jasmine.config` we more-or-less guarantee that the connection to Mongodb will instantiate before
any other tests are run.

Probably need a better solution than this long-term...