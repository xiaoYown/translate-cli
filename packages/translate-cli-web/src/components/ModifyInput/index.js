import './index.less';
import { Input } from 'antd';

const ModifyInput = (props) => {
  const { name, data, onChange } = props;
  return <div
    className="m-ModifyInput"
  >
    <h4 className="m-ModifyInput-title">{ name }</h4>
    <ul className="m-ModifyInput-langs">
      {
        Object.keys(data).map(key => {
          return <li
            key={key}
          >
            <span
              style={{
                display: 'inline-block',
                verticalAlign: 'top',
                width: '60px'
              }}
            >{ key } : </span>
            <div
              style={{
                display: 'inline-block',
                verticalAlign: 'top',
                width: '300px',
              }}
            >
              <Input
                value={data[key]}
                onChange={(e) => {
                  onChange({
                    key,
                    value: e.target.value
                  })
                }}
              />
            </div>
          </li>
        })
      }
    </ul>
  </div>
}

export default ModifyInput;
