export const formatCurrency = (value) => {

    const number = Number(value);

    return number.toLocaleString('pt-BR',
        {
            style: 'currency',
            currency: 'BRL'

    })
}

export const formatDate = (date) => {
  const newDate = new Date(date)
  return newDate.toLocaleDateString('pt-BR', { timeZone: 'UTC' })
}

export const formatZipcode = (zipcode) => {
  const value = String(zipcode).replace(/\D/g, '') 
  return value.replace(/(\d{5})(\d{3})/, '$1-$2') 
}

export const formatPhone = (phone) => {
  const value = String(phone).replace(/\D/g, '') 
  return value.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3') 
}

const message = {

  ServerErrorException: 'Algo deu errado. Tente novamente.',

    InvalidAuthenticationException: 'Usuário e/ou senha inválidos!',
    ClientNotFoundException: 'Cliente não encontrado.',
    MeUnauthenticationException: 'Você não está autenticado.',
    InvalidVerifyEmailTokenException: 'Token inválido ou expirado.',
    EmailAlreadyVerifiedException: 'O e-mail já foi verificado.',
    AdminEmailAlreadyExistsException: 'Email do administrador já cadastrado.',
    CompanyEmailAlreadyExistsException: 'Email da empresa já cadastrado.',
    CnpjAlreadyExistsException: 'Este CNPJ já foi cadastrado.',

}

export const errorMessage = (code = 'ServerErrorException') => message[code]