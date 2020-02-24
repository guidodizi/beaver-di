import { connect } from '../../src';

const factory2 = ({ module }) => ({
  salute: () => "I'm module 2",
  derive: () => `${module.salute()} - called from module 2`,
});

export default connect(factory2, { module: 'value2.module3A' });
