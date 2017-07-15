/**
 * Created by mateos on 15/07/2017.
 */
import { shallow } from 'enzyme'
import React from 'react'
import App from '../index.html';
describe('Index.js page', () => {
    it('has a "<div>" tag', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find('div').length).toBe(1)    })
})