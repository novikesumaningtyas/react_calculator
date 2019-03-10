import React from 'react';
import App from './App';
import { shallow } from 'enzyme';


describe('App component', () => {
    it('Calculator display starts with 0', () => {
        const wrapper = shallow(<App />);
        const text = wrapper.find('p').text();
        expect(text).toEqual('0');
    });

    it('Shows 1 when the button 1 is pressed', () => {
        const wrapper = shallow(<App />);
        const button = wrapper.find('CalButton.key-1');
        button.simulate('press');
        const text = wrapper.find('p').text()
        expect(text).toEqual('1');
    });

    it('Shows 2 when the button 2 is pressed', () => {
        const wrapper = shallow(<App />);
        const button = wrapper.find('CalButton.key-2');
        button.simulate('press');
        const text = wrapper.find('p').text()
        expect(text).toEqual('2');
    });

    it('Shows 3 when the button 3 is pressed', () => {
        const wrapper = shallow(<App />);
        const button = wrapper.find('CalButton.key-3');
        button.simulate('press');
        const text = wrapper.find('p').text()
        expect(text).toEqual('3');
    });

    it('Shows 4 when the button 4 is pressed', () => {
        const wrapper = shallow(<App />);
        const button = wrapper.find('CalButton.key-4');
        button.simulate('press');
        const text = wrapper.find('p').text()
        expect(text).toEqual('4');
    });

    it('Shows 5 when the button 5 is pressed', () => {
        const wrapper = shallow(<App />);
        const button = wrapper.find('CalButton.key-5');
        button.simulate('press');
        const text = wrapper.find('p').text()
        expect(text).toEqual('5');
    });

    it('Shows 6 when the button 6 is pressed', () => {
        const wrapper = shallow(<App />);
        const button = wrapper.find('CalButton.key-6');
        button.simulate('press');
        const text = wrapper.find('p').text()
        expect(text).toEqual('6');
    });

    it('Shows 7 when the button 7 is pressed', () => {
        const wrapper = shallow(<App />);
        const button = wrapper.find('CalButton.key-7');
        button.simulate('press');
        const text = wrapper.find('p').text()
        expect(text).toEqual('7');
    });

    it('Shows 8 when the button 8 is pressed', () => {
        const wrapper = shallow(<App />);
        const button = wrapper.find('CalButton.key-8');
        button.simulate('press');
        const text = wrapper.find('p').text()
        expect(text).toEqual('8');
    });

    it('Shows 9 when the button 9 is pressed', () => {
        const wrapper = shallow(<App />);
        const button = wrapper.find('CalButton.key-9');
        button.simulate('press');
        const text = wrapper.find('p').text()
        expect(text).toEqual('9');
    });

    it('Should still showing the first number after the operator pressed', () => {
        const wrapper = shallow(<App />);
        const button = wrapper.find('CalButton.key-9');
        button.simulate('press');

        const plus = wrapper.find('CalButton.key-add');
        plus.simulate('press');

        const text = wrapper.find('p').text()
        expect(text).toEqual('9');
    });

    it('Should change the second value to 1 when user choose 1 button', () => {
        const wrapper = shallow(<App />);
        const button = wrapper.find('CalButton.key-9');
        button.simulate('press');

        const plus = wrapper.find('CalButton.key-add');
        plus.simulate('press');

        const button1 = wrapper.find('CalButton.key-1');
        button1.simulate('press');

        const text = wrapper.find('p').text()
        expect(text).toEqual('1');
    });


    it('Adds . when the button . is pressed', () => {
        const wrapper = shallow(<App />);
        const button = wrapper.find('CalButton.key-3');
        button.simulate('press');

        const dot = wrapper.find('CalButton.key-dot');
        dot.simulate('press');

        const text = wrapper.find('p').text()
        expect(text).toEqual('3.');
    });


    it('Adds 2 values', () => {
        const wrapper = shallow(<App />);

        const button9 = wrapper.find('CalButton.key-9');
        button9.simulate('press');

        const plus = wrapper.find('CalButton.key-add');
        plus.simulate('press');

        const button1 = wrapper.find('CalButton.key-1');
        button1.simulate('press');

        const result = wrapper.find('CalButton.key-equals');
        result.simulate('press');

        const text = wrapper.find('p').text()
        expect(text).toEqual('10');
    });


    it('Subtracts 2 values', () => {
        const wrapper = shallow(<App />);

        const button9 = wrapper.find('CalButton.key-9');
        button9.simulate('press');

        const minus = wrapper.find('CalButton.key-subtract');
        minus.simulate('press');

        const button1 = wrapper.find('CalButton.key-1');
        button1.simulate('press');

        const result = wrapper.find('CalButton.key-equals');
        result.simulate('press');

        const text = wrapper.find('p').text()
        expect(text).toEqual('8');
    });

    it('Multiplies 2 values', () => {
        const wrapper = shallow(<App />);

        const button9 = wrapper.find('CalButton.key-9');
        button9.simulate('press');

        const multiply = wrapper.find('CalButton.key-multiply');
        multiply.simulate('press');

        const button2 = wrapper.find('CalButton.key-2');
        button2.simulate('press');

        const result = wrapper.find('CalButton.key-equals');
        result.simulate('press');

        const text = wrapper.find('p').text()
        expect(text).toEqual('18');
    });

    it('Divides 2 values', () => {
        const wrapper = shallow(<App />);

        const button9 = wrapper.find('CalButton.key-9');
        button9.simulate('press');

        const divide = wrapper.find('CalButton.key-divide');
        divide.simulate('press');

        const button2 = wrapper.find('CalButton.key-2');
        button2.simulate('press');

        const result = wrapper.find('CalButton.key-equals');
        result.simulate('press');

        const text = wrapper.find('p').text()
        expect(text).toEqual('4.5');
    });

    it('Does square root for first number input', () => {
        const wrapper = shallow(<App />);

        const button9 = wrapper.find('CalButton.key-9');
        button9.simulate('press');

        const sqrt = wrapper.find('CalButton.key-root');
        sqrt.simulate('press');

        const result = wrapper.find('CalButton.key-equals');
        result.simulate('press');

        const text = wrapper.find('p').text()
        expect(text).toEqual('3');
    });

    it('Does power of first number by second number input', () => {
        const wrapper = shallow(<App />);

        const button9 = wrapper.find('CalButton.key-9');
        button9.simulate('press');

        const pow = wrapper.find('CalButton.key-power');
        pow.simulate('press');

        const button2 = wrapper.find('CalButton.key-2');
        button2.simulate('press');

        const result = wrapper.find('CalButton.key-equals');
        result.simulate('press');

        const text = wrapper.find('p').text()
        expect(text).toEqual('81');
    });

    it('Delete number and allowed user to input the correct one', () => {
        const wrapper = shallow(<App />);

        const button9 = wrapper.find('CalButton.key-9');
        button9.simulate('press');

        const op = wrapper.find('CalButton.key-add');
        op.simulate('press');

        const button1 = wrapper.find('CalButton.key-1');
        button1.simulate('press');

        const del = wrapper.find('CalButton.key-clear');
        del.simulate('press');

        const button2 = wrapper.find('CalButton.key-2');
        button2.simulate('press');

        const result = wrapper.find('CalButton.key-equals');
        result.simulate('press');

        const text = wrapper.find('p').text()
        expect(text).toEqual('11');
    });


});



