import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import { NavLink } from 'react-router-dom';

import HeaderComponent from './HeaderComponent';
import ClockComponent from '../ClockComponent/ClockComponent';

configure({ adapter: new Adapter() });

describe('Header component', () => {
    it('should render two navigation links', () => {
        const wrapper = shallow(<HeaderComponent />);
        expect(wrapper.find(NavLink)).toHaveLength(3);
    });
    it('should render clock component', () => {
        const wrapper = shallow(<HeaderComponent />);
        expect(wrapper.find(ClockComponent)).toHaveLength(1);
    });
});
