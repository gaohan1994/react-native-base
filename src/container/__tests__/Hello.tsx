import React from 'react';
import renderer from 'react-test-renderer';
import Hello from '../Hello';

describe('Hello test begin', () => {

  it('should render Hello', () => {
      const tree = renderer.create(<Hello/>).toJSON();
      expect(tree).toMatchSnapshot();
  });
});
