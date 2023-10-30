import React, { useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import CustomColors from '../stylus/colors';


const DropSheds = ({ addShed }) => {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Coripata', value: 'Coripata' },
        { label: 'Arapata', value: 'Arapata' },
        { label: 'Coroico', value: 'Coroico' },
        { label: 'Milluhuaya', value: 'Milluhuaya' },
        { label: 'Suapi Quilo', value: 'Suapi Quilo' },
        { label: 'Trinidad Pamapa', value: 'Trinidad Pamapa' },
        { label: 'San Juan', value: 'San Juan' },
        { label: 'Cruz Loma', value: 'Cruz Loma' },
        { label: 'Chulumani', value: 'Chulumani' },
        { label: 'Chamaca', value: 'Chamaca' },
        { label: 'Irupana', value: 'Irupana' },
        { label: 'La Asunta', value: 'La Asunta' },
        { label: 'Huancaine', value: 'Huancaine' },
        { label: 'Chicaloma', value: 'Chicaloma' },
        { label: 'Yanacachi', value: 'Yanacachi' },
        { label: 'San Jose', value: 'San Jose' },
        { label: 'Inquisivi', value: 'Inquisivi' },
    ]);
    

    const sendName = (value) => {
        addShed(value)
    }

    return (
        <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder='Select an Shed'
            onChangeValue={(value) => {
                sendName(value)
            }}
            selectedItemContainerStyle={{
                backgroundColor: CustomColors.secondary,
            }}
            listMode="MODAL"
            searchable={false}
            modalTitle="Select an item"
            modalAnimationType="slide"
            modalTitleStyle={{
                fontWeight: "bold",
                color: CustomColors.primary
            }}
            modalContentContainerStyle={{
                backgroundColor: CustomColors.white,
            }}
            
        />
    )
}

export default DropSheds