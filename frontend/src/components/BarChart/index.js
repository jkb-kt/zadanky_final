import { ResponsiveBar } from '@nivo/bar'
import React from 'react'
import { Label, Wrapper } from './styled'

export default ({ data, label }) => (
  <Wrapper>
    <Label>{label}</Label>
    <ResponsiveBar
      data={data}
      keys={['count']}
      indexBy="name"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      colors={{ scheme: 'nivo' }}
      defs={[
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: '#eed312',
          rotation: -45,
          lineWidth: 6,
          spacing: 10
        }
      ]}
      fill={[
        {
          match: {
            id: 'count'
          },
          id: 'lines'
        }
      ]}
      // borderColor={{}}
      axisTop={null}
      axisRight={null}
      /*     axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Vozidlo',
      legendPosition: 'middle',
      legendOffset: 32
    }} */
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Počet jízd',
        legendPosition: 'middle',
        legendOffset: -40
      }}
      /*       labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: 'color', modifiers: [['darker', 2]] }} */
      /*     legends={[
      {
        dataFrom: 'keys',
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 120,
        translateY: 0,
        itemsSpacing: 2,
        itemWidth: 100,
        itemHeight: 20,
        itemDirection: 'left-to-right',
        itemOpacity: 0.85,
        symbolSize: 20,
        effects: [
          {
            on: 'hover',
            style: {
              itemOpacity: 1
            }
          }
        ]
      }
    ]} */
      //   animate={true}
      //   motionStiffness={90}
      //  motionDamping={15}
    />
  </Wrapper>
)
