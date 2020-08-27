import { BurgerBuilder } from './BurgerBuilder';

import { configure, shallow } from 'enzyme';//shallow used most often
import Adapter from 'enzyme-adapter-react-16';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import React from 'react';

configure({ adapter: new Adapter() })

describe('<BurgerBuilder/>', () => {
    let wrapper;


    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => { }} />)
    });

    it('Should render BuildControls when receiving ingredients', () => {
        wrapper.setProps({ ings: { salad: 0 } });
        expect(wrapper.find(BuildControls)).toHaveLength(1)
    })
})