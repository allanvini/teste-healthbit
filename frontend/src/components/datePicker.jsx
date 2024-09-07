import { useState, useEffect } from "react";
import styled from "styled-components";

import InputField from "./inputField";
import DropDownSelector from "./dropDownSelector";

export default function DatePicker({ value, onChange, label, id }) {
    const [day, setDay] = useState(() => value ? value.split('/')[0] : '');
    const [month, setMonth] = useState(() => value ? value.split('/')[1] : '');
    const [year, setYear] = useState(() => value ? value.split('/')[2] : '');

    // Atualiza a data montada e chama onChange
    useEffect(() => {
        if (day && month && year) {
            const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
            onChange(formattedDate);
        }
    }, [day, month, year, onChange]);

    const handleDateInputChange = (newDate) => {
        const selectedDate = new Date(newDate);
        if (!isNaN(selectedDate)) {
            setDay(String(selectedDate.getDate()+1).padStart(2, '0'));
            setMonth(String(selectedDate.getMonth() + 1).padStart(2, '0'));
            setYear(String(selectedDate.getFullYear()));
        }
    };

    return (
        <FieldWrapper id={id}>
            <Label>{label}</Label>
            <InputsWrapper>
                <DropDownSelector value={day} onChange={(e) => setDay(e.target.value)}>
                    <option disabled>Dia</option>
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                        <option key={d} value={String(d).padStart(2, '0')}>
                            {d}
                        </option>
                    ))}
                </DropDownSelector>

                <DropDownSelector value={month} onChange={(e) => setMonth(e.target.value)}>
                    <option disabled>Mês</option>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                        <option key={m} value={String(m).padStart(2, '0')}>
                            {m}
                        </option>
                    ))}
                </DropDownSelector>

                <DropDownSelector value={year} onChange={(e) => setYear(e.target.value)}>
                    <option disabled>Ano</option>
                    {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((y) => (
                        <option key={y} value={y}>
                            {y}
                        </option>
                    ))}
                </DropDownSelector>

                <InputField
                    value={`${year}-${month}-${day}`} // Define o valor no formato YYYY-MM-DD
                    onChange={(e) => handleDateInputChange(e)} // Atualiza o estado quando o usuário seleciona uma data
                    type="date"
                    style={{ width: 60, margin: "4px 0", padding: "0", textAlign: "center" }} // Ajusta o tamanho do campo para apenas o ícone
                />
            </InputsWrapper>
        </FieldWrapper>
    );
}

const FieldWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 10px 0 10px 0;
    gap: 5px;
`;

const InputsWrapper = styled.div`
    display: flex;
    gap: 10px;
`;

const Label = styled.label`
    font-weight: 500;
`;
