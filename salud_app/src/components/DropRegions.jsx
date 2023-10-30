import React, { useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker'

const DropRegions = ({ addRegion }) => {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Adepcoca', value: 'adepcoca' },
        { label: 'Sacaba', value: 'sacaba' }
    ]);

    const sendName = (value) => {
        addRegion(value)
    }

    return (
        <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder= 'Select una Region'
            onChangeValue={(value) => sendName(value)}
            dropDownContainerStyle={{
                backgroundColor: "#dfdfdf"
            }}
            dropDownDirection="TOP"
        />
    )
}

export default DropRegions