import styled from 'styled-components'

export default function InputField({id, value, onChange, style = {}, defaultValue, type, label, placehlder, mask, prefix, postfix, min, max, disabled}){
    
    function handleInputChange (e) {
        let inputValue = e.target.value;
        if (mask) {
            inputValue = applyMask(inputValue, mask);
        }

        onChange(inputValue);
    };

    function applyMask (value, mask) {
        let maskedValue = '';
        let valueIndex = 0;
        
        // Remove qualquer caractere não permitido da entrada
        const rawValue = value.replace(/[^a-zA-Z0-9]/g, '');

        for (let i = 0; i < mask.length && valueIndex < rawValue.length; i++) {
            const maskChar = mask[i];
            const inputChar = rawValue[valueIndex];

            if (maskChar === '0') {
                // Aceita apenas números
                if (/\d/.test(inputChar)) {
                    maskedValue += inputChar;
                    valueIndex++;
                } else {
                    continue; // Pula a iteração se o inputChar não for um número
                }
            } else if (maskChar === 'X') {
                // Aceita apenas letras
                if (/[a-zA-Z]/.test(inputChar)) {
                    maskedValue += inputChar;
                    valueIndex++;
                } else {
                    continue; // Pula a iteração se o inputChar não for uma letra
                }
            } else {
                // Adiciona caracteres fixos da máscara (como ".", "-", etc.)
                maskedValue += maskChar;
            }
        }
        return maskedValue;
    };
    
    return (
        <FieldWrapper  style={{...style, ...{opacity: disabled ? 0.5 : 1} }}>
            <Label>{label}</Label>
            <InputWrapper id={id}>
                {prefix}
                <Input
                    value={value}
                    onChange={handleInputChange}
                    defaultValue={defaultValue}
                    type={type ? type : 'text'}
                    placeholder={placehlder}
                    min={min}
                    max={max}
                    disabled={disabled}
                />
                {postfix}
            </InputWrapper>
        </FieldWrapper>
    )
}

const FieldWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
`

const InputWrapper = styled.div`
    border: 2px solid #d5d5d5;
    border-radius: 3px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 10px 0 10px;
`

const Label = styled.label`
    font-weight: 500;
`

const Input = styled.input`
    padding: 10px;
    width: 100%;
    border: none;
    &:focus{
        outline: none;
    }
`