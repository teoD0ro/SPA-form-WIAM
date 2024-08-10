import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
    personalData: {
        tel: string;
        name: string;
        surname: string;
        gender: string;
    };
    addressData: {
        workplace: string;
        address: string;
    };
    loanData: {
        loanAmount: number;
        loanTerm: number;
    };
}

const initialState: FormState = {
    personalData: { tel: '', name: '', surname: '', gender: '' },
    addressData: { workplace: '', address: '' },
    loanData: { loanAmount: 200, loanTerm: 1 },
};

const formsSlice = createSlice({
    name: 'forms',
    initialState,
    reducers: {
        setPersonalData(state, action: PayloadAction<FormState['personalData']>) {
            state.personalData = action.payload;
        },
        setAddressData(state, action: PayloadAction<FormState['addressData']>) {
            state.addressData = action.payload;
        },
        setLoanData(state, action: PayloadAction<FormState['loanData']>) {
            state.loanData = action.payload;
        },
    },
});

export const { setPersonalData, setAddressData, setLoanData } = formsSlice.actions;
export default formsSlice.reducer;