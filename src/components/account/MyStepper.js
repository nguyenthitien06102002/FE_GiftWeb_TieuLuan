import React from 'react';
import { Box, Stepper, Step, StepLabel, StepIcon } from '@mui/material';
import "./account.css"

const steps = ['Chờ xác nhận', 'Đang vận chuyển', 'Giao hàng thành công', 'Đánh giá'];

const MyStepper = ({statuss}) => {
    const [activeStep, setActiveStep] = React.useState(1);
    console.log(statuss)

    const handleStepChange = (event, newActiveStep) => {
        setActiveStep(newActiveStep);
    };

    return (
        <Box sx={{ width: '100%' }} className="stepper-red">
            <Stepper activeStep={1} alternativeLabel className="p-5" >
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>

        
    );
};

export default MyStepper;