import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { message } from 'antd';
import {
  fetchConfig,
  postSaveBaseUrl,
  fetchFiles,
  postBatchRemoveKeys,
} from '../apis';

// - config 数据
const configStore = observable({
  baseUrl: ''
});
const configWrapper = (Component) => {
  const Observer = observer(Component);
  return props => <Observer {...props} configStore={configStore} />
};
const updateBaseUrl = action((value) => {
  configStore.baseUrl = value;
})
const saveBaseUrl = action(() => {
  const { baseUrl } = configStore;
  return postSaveBaseUrl({ baseUrl }).then(res => {
    const { code } = res.data;
    if (code === 0) {
      initBaseData();
      message.success('修改成功');
    } else {
      message.error('修改失败');
    }
    return res;
  }).catch(err => {
    message.error('修改失败');
    throw err;
  });
})
const getConfigData = action((value) => {
  fetchConfig().then(res => {
    const { code, data } = res.data;
    if (code === 0) {
      Object.assign(configStore, data);
    } else {
    }
  }).catch(err => {
  });
});

// - files 数据
const defaultFileStore = () => ({
  datasource: [],
  langs: []
});
const filesStore = observable(defaultFileStore());

const filesWrapper = (Component) => {
  const Observer = observer(Component);
  return props => <Observer {...props} filesStore={filesStore} />
};

const resetFilesStore = () => Object.assign(filesStore, defaultFileStore());
const getFilesData = action(() => {
  fetchFiles().then(res => {
    const { code, data } = res.data;
    if (code === 0) {
      const { datasource, info } = data;
      filesStore.datasource = datasource;
      filesStore.langs = Object.keys(info);
    } else if (code === 10400) {
      message.error('指定目录不存在');
      resetFilesStore();
    } else {
      message.error('读取数据失败');
      resetFilesStore();
    }
  }).catch(err => {
    message.error('读取数据失败');
    resetFilesStore();
    throw err;
  });
});


// - 多选操作数据
const batchOptsStore = observable({
  open: false,
  checkedKeys: [],
});
const switchBatchOptsStatus = action(() => {
  batchOptsStore.open = !batchOptsStore.open;
  if (!batchOptsStore.open) {
    batchOptsStore.checkedKeys = [];
  }
})
const updateBatchChecked = action(({ method, key }) => {
  switch (method) {
    case 'update':
      const index = batchOptsStore.checkedKeys.indexOf(key);
      if (index !== -1) {
        batchOptsStore.checkedKeys.splice(index, 1);
      } else {
        batchOptsStore.checkedKeys.push(key);
      }
      break;
  }
})
const removeBatchKeys = action(() => {
  return postBatchRemoveKeys({
    keys: batchOptsStore.checkedKeys
  }).then(res => {
    const { code, data } = res.data;
    if (code === 0) {
      getFilesData();
    } else {
      message.error('删除失败');
    }
  }).catch(err => {
    message.error('删除错误')
    throw err;
  })
})
const batchOptsWrapper = (Component) => {
  const Observer = observer(Component);
  return props => <Observer {...props} batchOptsStore={batchOptsStore} />
}
const initBaseData = () => {
  getConfigData();
  getFilesData();
}

export {
  initBaseData,

  getConfigData,
  configWrapper,
  updateBaseUrl,
  saveBaseUrl,

  getFilesData,
  filesWrapper,

  batchOptsStore,
  batchOptsWrapper,
  updateBatchChecked,
  switchBatchOptsStatus,
  removeBatchKeys,
}
