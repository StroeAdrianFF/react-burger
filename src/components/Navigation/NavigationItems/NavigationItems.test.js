
import { configure, shallow } from 'enzyme';//shallow used most often
import Adapter from 'enzyme-adapter-react-16';


import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

import React from 'react';


configure({ adapter: new Adapter() })//connected enzyme

describe('<NavigationItems />', () => {
    let wrapper;
    beforeEach(() => {//executed before EACH test
        wrapper = shallow(<NavigationItems />)
    })


    it('should render 2 <NavigationItem /> elements if not Auth', () => {//lets you write 1 individual test
        expect(wrapper.find(NavigationItem)).toHaveLength(2)//in here we define what we wanna check
    });


    it('should render 3 <NavigationItem /> elements if  Auth', () => {
        // wrapper = shallow(<NavigationItems isAuthenticated />)
        wrapper.setProps({ isAuthenticated: true })
        expect(wrapper.find(NavigationItem)).toHaveLength(3)
    });


    it('Is there a <NavigationItem /> node inside ?', () => {
        wrapper.setProps({ isAuthenticated: true })
        expect(wrapper.contains(<NavigationItem link="/logout">Log Out</NavigationItem>)).toEqual(true)//toEqual(true) = find it IF we ARE authenticated
    });
});

//enzyme allows us to render a standalone component