import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';

import SingleTableComponent from './SingleTableComponent';

configure({ adapter: new Adapter() });

describe('SingleTable component', () => {

    const mockedSingleData = [];
    const mockedTitle = 'Table title'
    const wrapper = shallow(<SingleTableComponent singleData={mockedSingleData} title={mockedTitle} />);
    
    it('should render one table element', () => {
        expect(wrapper.find('table')).toHaveLength(1);
     });
    xit('should render table header with title from props', () => {
       //
    });
    xit('should render table - number of', () => {
       //
    });
});
