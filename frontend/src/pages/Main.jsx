import { useTranslation } from 'react-i18next'

import { useGetChannelsQuery, useGetMessagesQuery } from '../api/chatApi'
import ChannelMessages from '../components/ChannelMessages'
import InputMessage from '../components/InputMessage'
import Channels from '../components/Channels'
import AddChannelButton from '../components/AddChannelButton'

const Main = () => {
  const { t } = useTranslation('Components', { keyPrefix: 'Main.Chat' })

  // RTK Query сам всё загрузит
  useGetChannelsQuery()
  useGetMessagesQuery()

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>{t('channels')}</b>
            <AddChannelButton />
          </div>
          <Channels />
        </div>

        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <ChannelMessages />
            <InputMessage />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main
