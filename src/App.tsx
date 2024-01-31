import { useEffect } from 'react'
import RouteIndex from './routes/RouteIndex'
import api from './services/apis/index'
import { useDispatch } from 'react-redux'
import { taskAction } from './store/slices/task.slice'

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetch = async () => {
      let result = await api.task.findAll();
      dispatch(taskAction.setData(result?.data.data))
    }
    fetch()
  }, [])

  return (
    <RouteIndex />
  )
}
