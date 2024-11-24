import './App.css'
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useForm } from 'react-hook-form';



function App() {

  let [resultImc, setResultImc] = useState(true);
  const [situacao, setSituacao] = useState('INDEFINDO');
  let [imc, setImc] = useState(0);
  const {register, handleSubmit, formState: {errors}} = useForm();

  function handleSetResult(data){

    const strNumber = data.height.toString();
    const formatted = strNumber.replace(/^(\d)(\d+)/, "$1.$2");
    const finalNumber = parseFloat(formatted);
 
    const finalImc = data.weight / (finalNumber*2);

    setImc(finalImc.toFixed(1));

    setSituacao(verificaResultadoSituacao(finalImc));

    console.log(verificaResultadoSituacao(finalImc));
    setResultImc(!resultImc);
    
  }

  function verificaResultadoSituacao(imc){
    if(imc<=18.5){
      return 'Magreza';
    }else if(imc<=24.9&&imc>=18.6){
      return 'Normal';
    }else if(imc<=29.9&&imc>=25){
      return 'Sobrepeso'
    }else if(imc<=39.9&&imc>=30){
      return 'Obesidade';
    }else{
     return 'Obesidade Grave';
    }
  }




  return (
    <>
      <div className="container">
        {
          resultImc ? 
                <div className="div-calculadora-de-imc">
                    <h1>Calculadora de IMC</h1>
                    <form> 


                      <div className='div-form-input'>
                        <label>Altura (cm):</label>
                        <input 
                        className={errors.height ? 'input error' : 'input'}
        
                        type="number" required placeholder='Digite sua altura:' {...register('height', {required: true})} />
                       {errors.height &&  <p className='error-messagem'>Field is required</p>}
                      </div>

                      <div className='div-form-input'>
                        <label>Peso (Kg):</label>
                        <input 
                        className={errors.weight ? 'input error' : 'input'}
                        type="number" required placeholder='Digite seu peso' {...register('weight', {required: true})} />
                        {errors.weight &&  <p className='error-messagem'>Field is required</p>}
                      </div>

                      <div className='div-form-input-button'>
                      <Button variant="contained" className='button' id='button-clean'>Limpar</Button>
                      <Button variant="contained" onClick={() => handleSubmit(handleSetResult)()} >Enviar</Button>
                      </div>

                    </form>
              </div>
          :
                <div className='div-calculadora-de-imc result' >
                <h1 >Seu IMC é: <span className={situacao}>{imc}</span></h1>
                <h2 >Situação atual: <span className={situacao}>{situacao}</span></h2>
                <h3>Confira as classificações</h3>
                <ul id='ul-imc'>
                  <li id='ul-imc-li-title'>
                    <span>IMC</span>
                    <p>Classificação</p>
                    <p>Obisidade</p>
                  </li>
                  <li id='ul-imc-li'>
                    <span>Menor que 18,5</span>
                    <p>Magreza</p>
                    <p>0</p>
                  </li>
                  <li id='ul-imc-li'>
                    <span>Entre 18,5 e 24,9</span>
                    <p>Normal</p>
                    <p>0</p>
                  </li>
                  <li id='ul-imc-li'>
                    <span>Entre 25,0 e 29,9</span>
                    <p>Sobrepeso</p>
                    <p>I</p>
                  </li>
                  <li id='ul-imc-li'>
                    <span>Entre 30,0 e 39,9</span>
                    <p>Obesidade</p>
                    <p>II</p>
                  </li>
                  <li id='ul-imc-li'>
                    <span>Maior que 40,0</span>
                    <p>Obesidade grave</p>
                    <p>III</p>
                  </li>
                 
                </ul>
                <Button variant="contained" onClick={() => setResultImc(!resultImc)} >Voltar</Button>
            
                </div>
        }
      </div>
    </>
  )
}

export default App
