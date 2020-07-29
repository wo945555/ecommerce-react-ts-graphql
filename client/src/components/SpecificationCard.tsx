import React from 'react';
import './SpecificationCard.scss';
import { Tabs } from 'antd';
import { PlatformIcon } from '../components/common/PlatformIcon';
import { Specification } from '../api/db-types';

const { TabPane } = Tabs;

interface Props {
  specifications: Specification[];
}

export const SpecificationCard:React.FC<Props> = (props) => {
  const { specifications } = props;
  return (
    <Tabs className="specifications">
      { specifications.length > 0 && specifications.map(specification => {
        
        const {platform, minimum_os, minimum_cpu, minimum_gpu, minimum_memory, minimum_storage, 
         recommended_os, recommended_cpu, recommended_gpu, recommended_memory, recommended_storage, 
         languages_supported} = specification;
         
         return(
          <TabPane 
           tab={<span>
              <PlatformIcon platform={platform} />
              {platform}
            </span>}
            key={platform}>
            <table>
              <tbody>
                <tr>
                  <th className="specification-label">
                    <span>最低配置</span>
                  </th>
                  <th className="specification-label">
                    <span>推荐配置</span>
                  </th>
                </tr>
                <tr>
                  <td className="specification-cell">
                    <div className="specification-label">
                      <span>OS</span>
                    </div>
                    <span>{minimum_os}</span>
                  </td>
                  <td className="specification-cell">
                    <div className="specification-label">
                      <span>OS</span>
                    </div>
                    <span>{recommended_os}</span>
                  </td>
                </tr>
                <tr>
                  <td className="specification-cell">
                    <div className="specification-label">
                      <span>Processor</span>
                    </div>
                    <span>{minimum_cpu}</span>
                  </td>
                  <td className="specification-cell">
                    <div className="specification-label">
                      <span>Processor</span>
                    </div>
                    <span>{recommended_cpu}</span>
                  </td>
                </tr>
                <tr>
                  <td className="specification-cell">
                    <div className="specification-label">
                      <span>Memory</span>
                    </div>
                    <span>{minimum_memory}</span>
                  </td>
                  <td className="specification-cell">
                    <div className="specification-label">
                      <span>Memory</span>
                    </div>
                    <span>{recommended_memory}</span>
                  </td>
                </tr>
                <tr>
                  <td className="specification-cell">
                    <div className="specification-label">
                      <span>Graphics</span>
                    </div>
                    <span>{minimum_gpu}</span>
                  </td>
                  <td className="specification-cell">
                    <div className="specification-label">
                      <span>Graphics</span>
                    </div>
                    <span>{recommended_gpu}</span>
                  </td>
                </tr>
                <tr>
                  <td className="specification-cell">
                    <div className="specification-label">
                      <span>HDD Space</span>
                    </div>
                    <span>{minimum_storage}</span>
                  </td>
                  <td className="specification-cell">
                    <div className="specification-label">
                      <span>HDD Space</span>
                    </div>
                    <span>{recommended_storage}</span>
                  </td>
                </tr>
                <tr>
                  <td className="specification-cell" colSpan={2}>
                    <div className="specification-label">
                      <span>支持的语言</span>
                    </div>
                    <span>{languages_supported}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </TabPane>)
      }) }
    </Tabs>
  )
}