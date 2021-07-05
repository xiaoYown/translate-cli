import { Input } from 'antd';

const ModifyInput = (props) => {
  const { name, data, onChange } = props;
  return <div
    style={{
      display: 'inline-block',
      verticalAlign: 'top',
      width: '33%',
      padding: '0 8px',
      lineHeight: '39px'
    }}
  >
    <h4>{ name }</h4>
    <ul>
      {
        Object.keys(data).map(key => {
          return <li
            key={key}
          >
            <span
              style={{
                display: 'inline-block',
                verticalAlign: 'top',
                verticalAlign: 'top',
                width: '60px'
              }}
            >{ key } : </span>
            <div
              style={{
                display: 'inline-block',
                verticalAlign: 'top',
                width: '300px',
                padding: '4px 0'
              }}
            >
              <Input
                value={data[key]}
                onChange={(e) => {
                  console.log(e.target.value)
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
