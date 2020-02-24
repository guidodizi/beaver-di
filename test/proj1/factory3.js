import { connect } from '../../src';

const factory3 = ({ value }) => {
  return {
    salute: () => `I'm module 3`,
    value,
  };
};

export default connect(factory3, { value: 'value2.prop1' });
