// Esse arquivo funciona como um hub central para re-exportação de hooks do Redux pré-tipados
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from './store'

// Usar atraves da aplicação, em vez do 'useSelector' e 'useDispatch'
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()