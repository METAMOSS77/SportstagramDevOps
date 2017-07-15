/**
 * Created by mateos on 15/07/2017.
 */
import { shallow } from 'enzyme'
import React from 'react'
import Information from '../client/components/Information.js';
describe('Index.js page', () => {
    it('has a "<div>" tag', () => {
        const wrapper = shallow(<Information />);
        expect(wrapper.find('p').length).toBe(1)    })
})