const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiInterface = require('chai-interface');
const sinonChai = require('sinon-chai');

chai.use(chaiAsPromised);
chai.use(chaiInterface);
chai.use(sinonChai);

global.should = chai.should();
global.apiBaseUrl = 'http://localhost';
