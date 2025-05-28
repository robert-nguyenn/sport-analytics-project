/**
 * Sample data for demonstration when real data isn't available or contains too many "Unknown" values
 * This can be used as fallback data in the frontend components
 */

export const sampleMatchData = {
  preview: [
    {
      clock: '0:00',
      away_play: 'Jonelle Barron at goalie for Centre College.',
      visiting_team_score: 0,
      home_team_score: 0,
      home_play: '',
      score: '0-0',
      team_indicator: 'Away',
      play: 'Goalkeeper Setup',
      period: 1
    },
    {
      clock: '0:00',
      away_play: '',
      visiting_team_score: 0,
      home_team_score: 0,
      home_play: 'Haley Pratt at goalie for Emory University.',
      score: '0-0',
      team_indicator: 'Home',
      play: 'Goalkeeper Setup',
      period: 1
    },
    {
      clock: '3:06',
      away_play: '',
      visiting_team_score: 0,
      home_team_score: 0,
      home_play: 'Corner kick by Emory University Shivani Beall [03:06].',
      score: '0-0',
      team_indicator: 'Home',
      play: 'Corner Kick',
      period: 1
    },
    {
      clock: '6:07',
      away_play: '',
      visiting_team_score: 0,
      home_team_score: 0,
      home_play: 'Shot by Emory University Shivani Beall, Wide.',
      score: '0-0',
      team_indicator: 'Home',
      play: 'Shot - Missed',
      period: 1
    },
    {
      clock: '13:09',
      away_play: 'Centre College substitution: Brooke Smithson for Kennedy Cline',
      visiting_team_score: 0,
      home_team_score: 0,
      home_play: '',
      score: '0-0',
      team_indicator: 'Away',
      play: 'Substitution',
      period: 1
    },
    {
      clock: '16:50',
      away_play: 'GOAL by Centre College Sarah Sirkin, Assist by Gracie Fitzgerald',
      visiting_team_score: 1,
      home_team_score: 0,
      home_play: '',
      score: '1-0',
      team_indicator: 'Away',
      play: 'Goal',
      period: 1
    },
    {
      clock: '22:15',
      away_play: 'Shot by Centre College Sarah Sirkin, Save by goalie Haley Pratt',
      visiting_team_score: 1,
      home_team_score: 0,
      home_play: '',
      score: '1-0',
      team_indicator: 'Away',
      play: 'Shot - Saved',
      period: 1
    },
    {
      clock: '29:11',
      away_play: '',
      visiting_team_score: 1,
      home_team_score: 0,
      home_play: 'Shot by Emory University Arielle Williamson, Save by goalie Jonelle Barron.',
      score: '1-0',
      team_indicator: 'Home',
      play: 'Shot - Saved',
      period: 1
    },
    {
      clock: '33:42',
      away_play: '',
      visiting_team_score: 1,
      home_team_score: 0,
      home_play: 'Shot by Emory University Caroline Kolski, Wide.',
      score: '1-0',
      team_indicator: 'Home',
      play: 'Shot - Missed',
      period: 1
    },
    {
      clock: '43:00',
      away_play: 'End of period [43:00].',
      visiting_team_score: 1,
      home_team_score: 0,
      home_play: '',
      score: '1-0',
      team_indicator: 'Official',
      play: 'Period End',
      period: 1
    },
    {
      clock: '45:00',
      away_play: 'Start of 2nd period [45:00].',
      visiting_team_score: 1,
      home_team_score: 0,
      home_play: '',
      score: '1-0',
      team_indicator: 'Official',
      play: 'Period Start',
      period: 2
    },
    {
      clock: '45:00',
      away_play: 'Jonelle Barron at goalie for Centre College.',
      visiting_team_score: 1,
      home_team_score: 0,
      home_play: '',
      score: '1-0',
      team_indicator: 'Away',
      play: 'Goalkeeper Setup',
      period: 2
    },
    {
      clock: '45:00',
      away_play: '',
      visiting_team_score: 1,
      home_team_score: 0,
      home_play: 'Haley Pratt at goalie for Emory University.',
      score: '1-0',
      team_indicator: 'Home',
      play: 'Goalkeeper Setup',
      period: 2
    },
    {
      clock: '54:25',
      away_play: '',
      visiting_team_score: 1,
      home_team_score: 0,
      home_play: 'Foul on Emory University.',
      score: '1-0',
      team_indicator: 'Home',
      play: 'Foul',
      period: 2
    },
    {
      clock: '64:25',
      away_play: 'Foul on Centre College.',
      visiting_team_score: 1,
      home_team_score: 0,
      home_play: '',
      score: '1-0',
      team_indicator: 'Away',
      play: 'Foul',
      period: 2
    },
    {
      clock: '74:25',
      away_play: '',
      visiting_team_score: 1,
      home_team_score: 0,
      home_play: 'Yellow card on Emory University Kylie Hall.',
      score: '1-0',
      team_indicator: 'Home',
      play: 'Yellow Card',
      period: 2
    }
  ],
  cleaning_log: [
    {
      step: 'initial',
      rows: 90,
      columns: 9,
      missing_values: 123,
      duplicate_rows: 0,
      message: 'Data loaded with 90 rows and 9 columns'
    },
    {
      step: 'clean_column_names',
      rows: 90,
      columns: 9,
      missing_values: 123,
      duplicate_rows: 0,
      message: 'Converted column names to snake_case format'
    },
    {
      step: 'remove_duplicates',
      rows: 90,
      columns: 9,
      missing_values: 123,
      duplicate_rows: 0,
      message: 'No duplicate rows found'
    },
    {
      step: 'handle_missing_values',
      rows: 90,
      columns: 9,
      missing_values: 0,
      duplicate_rows: 0,
      message: 'Filled 123 missing values with appropriate defaults'
    }
  ],
  analysis: {
    summary: {
      numeric: {
        visiting_team_score: {
          count: 90,
          mean: 0.52,
          std: 0.50,
          min: 0,
          '25%': 0,
          '50%': 1,
          '75%': 1,
          max: 1
        },
        home_team_score: {
          count: 90,
          mean: 0.30,
          std: 0.46,
          min: 0,
          '25%': 0,
          '50%': 0,
          '75%': 0,
          max: 1
        },
        period: {
          count: 90,
          mean: 1.46,
          std: 0.50,
          min: 1,
          '25%': 1,
          '50%': 1,
          '75%': 2,
          max: 2
        },
        possession_percentage: {
          count: 90,
          mean: 52.4,
          std: 8.9,
          min: 32.1,
          '25%': 45.7,
          '50%': 52.8,
          '75%': 59.3,
          max: 67.9
        },
        shots_on_goal: {
          count: 90,
          mean: 1.24,
          std: 1.05,
          min: 0,
          '25%': 0,
          '50%': 1,
          '75%': 2,
          max: 3
        },
        shot_accuracy: {
          count: 90,
          mean: 68.5,
          std: 15.2,
          min: 0,
          '25%': 60.0,
          '50%': 70.0,
          '75%': 80.0,
          max: 100.0
        }
      },
      categorical: {
        team_indicator: {
          'Away': 38,
          'Home': 50,
          'Official': 2
        },
        play: {
          'Shot - Saved': 15,
          'Shot - Missed': 12,
          'Substitution': 22,
          'Corner Kick': 4,
          'Goal': 1,
          'Foul': 14,
          'Yellow Card': 3,
          'Goalkeeper Setup': 8,
          'Period End': 2,
          'Period Start': 2,
          'Offside': 3,
          'Tackle': 5,
          'Pass Intercepted': 3
        }
      },
      temporal: {
        play_distribution_by_period: {
          1: {
            'Shot - Saved': 8,
            'Shot - Missed': 7,
            'Substitution': 12,
            'Corner Kick': 2,
            'Goal': 1,
            'Foul': 8
          },
          2: {
            'Shot - Saved': 7,
            'Shot - Missed': 5,
            'Substitution': 10,
            'Corner Kick': 2,
            'Foul': 6,
            'Yellow Card': 3
          }
        },
        score_progression: [
          { time: '0:00', home: 0, away: 0 },
          { time: '16:50', home: 0, away: 1 },
          { time: '43:00', home: 0, away: 1 },
          { time: '90:00', home: 0, away: 1 }
        ]
      },
      statistical: {
        possession: {
          home_team: 45.7,
          visiting_team: 54.3
        },
        shots: {
          home_team: 15,
          visiting_team: 12
        },
        shots_on_target: {
          home_team: 9,
          visiting_team: 8
        },
        shot_accuracy: {
          home_team: 60.0,
          visiting_team: 66.7
        },
        pass_completion: {
          home_team: 78.3,
          visiting_team: 82.1
        },
        duels_won: {
          home_team: 48.2,
          visiting_team: 51.8
        },
        fouls: {
          home_team: 7,
          visiting_team: 7
        },
        cards: {
          home_team: { yellow: 2, red: 0 },
          visiting_team: { yellow: 1, red: 0 }
        }
      },
      performance: {
        player_ratings: {
          'Jonelle Barron': 7.8,
          'Haley Pratt': 7.2,
          'Sarah Sirkin': 8.5,
          'Gracie Fitzgerald': 7.9,
          'Shivani Beall': 7.6,
          'Arielle Williamson': 7.5,
          'Caroline Kolski': 7.3,
          'Kylie Hall': 6.8,
          'Brooke Smithson': 7.1,
          'Kennedy Cline': 6.7
        },
        key_performers: [
          { player: 'Sarah Sirkin', team: 'Centre College', rating: 8.5, stats: { goals: 1, assists: 0, shots: 2 } },
          { player: 'Gracie Fitzgerald', team: 'Centre College', rating: 7.9, stats: { goals: 0, assists: 1, shots: 1 } },
          { player: 'Jonelle Barron', team: 'Centre College', rating: 7.8, stats: { saves: 9, goals_conceded: 0 } }
        ],
        team_comparison: {
          attack: { home: 72, away: 78 },
          defense: { home: 68, away: 82 },
          midfield: { home: 75, away: 73 },
          overall: { home: 72, away: 78 }
        }
      }
    }
  },
  column_types: {
    clock: 'temporal',
    away_play: 'text',
    visiting_team_score: 'numeric',
    home_team_score: 'numeric',
    home_play: 'text',
    score: 'text',
    team_indicator: 'categorical',
    play: 'categorical',
    period: 'numeric',
    possession_percentage: 'numeric',
    shots_on_goal: 'numeric',
    shot_accuracy: 'numeric'
  },
  visualizations: {
    visiting_team_score_histogram: {
      type: 'histogram',
      title: 'Frequency of Visiting Team Score',
      data: [
        {
          x: [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          type: 'histogram',
          marker: {
            color: 'rgba(255, 99, 71, 0.7)'
          }
        }
      ],
      layout: {
        title: 'Frequency of Visiting Team Score',
        bargap: 0.05,
        bargroupgap: 0.2,
        barmode: 'overlay',
        xaxis: { title: 'Visiting Team Score', range: [-0.5, 1.5], dtick: 1 },
        yaxis: { title: 'Count' }
      }
    },
    home_team_score_histogram: {
      type: 'histogram',
      title: 'Frequency of Home Team Score',
      data: [
        {
          x: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          type: 'histogram',
          marker: {
            color: 'rgba(65, 105, 225, 0.7)'
          }
        }
      ],
      layout: {
        title: 'Frequency of Home Team Score',
        bargap: 0.05,
        bargroupgap: 0.2,
        barmode: 'overlay',
        xaxis: { title: 'Home Team Score', range: [-0.5, 1.5], dtick: 1 },
        yaxis: { title: 'Count' }
      }
    },
    period_histogram: {
      type: 'histogram',
      title: 'Frequency of Period',
      data: [
        {
          x: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2],
          type: 'histogram',
          marker: {
            color: 'rgba(75, 192, 192, 0.7)'
          }
        }
      ],
      layout: {
        title: 'Frequency of Period',
        bargap: 0.05,
        bargroupgap: 0.2,
        barmode: 'overlay',
        xaxis: { title: 'Period', range: [0.5, 2.5], dtick: 1 },
        yaxis: { title: 'Count' }
      }
    },
    play_type_bar: {
      type: 'bar',
      title: 'Frequency of Play Types',
      data: [
        {
          x: ['Shot - Saved', 'Shot - Missed', 'Substitution', 'Corner Kick', 'Goal', 'Foul', 'Yellow Card', 'Goalkeeper Setup', 'Period End', 'Period Start'],
          y: [15, 12, 22, 4, 1, 14, 3, 8, 2, 2],
          type: 'bar',
          marker: {
            color: ['rgba(75, 192, 192, 0.7)', 'rgba(255, 99, 132, 0.7)', 'rgba(255, 205, 86, 0.7)', 'rgba(54, 162, 235, 0.7)', 'rgba(153, 102, 255, 0.7)', 'rgba(255, 159, 64, 0.7)', 'rgba(201, 203, 207, 0.7)', 'rgba(75, 192, 192, 0.7)', 'rgba(255, 99, 132, 0.7)', 'rgba(255, 205, 86, 0.7)']
          }
        }
      ],
      layout: {
        title: 'Frequency of Play Types',
        xaxis: { title: 'Play Type' },
        yaxis: { title: 'Count' },
        margin: { b: 120 },
        xaxis_tickangle: -45
      }
    },
    team_actions_bar: {
      type: 'bar',
      title: 'Distribution of Actions by Team',
      data: [
        {
          x: ['Home', 'Away', 'Official'],
          y: [50, 38, 2],
          type: 'bar',
          marker: {
            color: ['rgba(65, 105, 225, 0.8)', 'rgba(255, 99, 71, 0.8)', 'rgba(100, 100, 100, 0.8)']
          }
        }
      ],
      layout: {
        title: 'Distribution of Actions by Team',
        xaxis: { title: 'Team' },
        yaxis: { title: 'Count' }
      }
    },
    visiting_team_score_line: {
      type: 'scatter',
      title: 'Visiting Team Score Over Time',
      data: [
        {
          x: ['0:00', '3:06', '6:07', '13:09', '16:50', '22:15', '29:11', '33:42', '43:00', '45:00', '54:25', '64:25', '74:25', '90:00'],
          y: [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          type: 'scatter',
          mode: 'lines+markers',
          line: { color: 'rgb(255, 99, 71)', width: 2 }
        }
      ],
      layout: {
        title: 'Visiting Team Score Over Time',
        xaxis: { title: 'Game Clock' },
        yaxis: { title: 'Score', range: [-0.1, 1.1] }
      }
    },
    play_types_pie: {
      type: 'pie',
      title: 'Distribution of Play Types',
      data: [
        {
          labels: ['Shot - Saved', 'Shot - Missed', 'Substitution', 'Corner Kick', 'Goal', 'Foul', 'Yellow Card', 'Goalkeeper Setup', 'Period End', 'Period Start'],
          values: [15, 12, 22, 4, 1, 14, 3, 8, 2, 2],
          type: 'pie',
          textinfo: 'percent+label',
          marker: {
            colors: [
              'rgb(54, 162, 235)',
              'rgb(255, 206, 86)',
              'rgb(75, 192, 192)',
              'rgb(255, 99, 132)',
              'rgb(153, 102, 255)',
              'rgb(255, 159, 64)',
              'rgb(199, 199, 199)',
              'rgb(83, 102, 255)',
              'rgb(255, 99, 71)',
              'rgb(65, 105, 225)'
            ]
          }
        }
      ],
      layout: {
        title: 'Distribution of Play Types',
        margin: { l: 0, r: 0, b: 0, t: 30 }
      }
    },
    heatmap: {
      type: 'heatmap',
      title: 'Correlation Heatmap',
      data: [
        {
          z: [
            [1.0, -0.5, 0.2, 0.4],
            [-0.5, 1.0, 0.1, -0.3],
            [0.2, 0.1, 1.0, -0.7],
            [0.4, -0.3, -0.7, 1.0]
          ],
          x: ['visiting_team_score', 'home_team_score', 'period', 'clock_minutes'],
          y: ['visiting_team_score', 'home_team_score', 'period', 'clock_minutes'],
          type: 'heatmap',
          colorscale: 'RdBu',
          zmin: -1,
          zmax: 1
        }
      ],
      layout: {
        title: 'Correlation Heatmap'
      }
    },
    radar_chart: {
      type: 'scatter',
      title: 'Team Performance Comparison',
      data: [
        {
          r: [68, 72, 75, 78, 65, 70],
          theta: ['Defense', 'Attack', 'Midfield', 'Possession', 'Set Pieces', 'Discipline'],
          type: 'scatterpolar',
          fill: 'toself',
          name: 'Home Team',
          marker: { color: 'rgba(65, 105, 225, 0.7)' }
        },
        {
          r: [82, 78, 73, 82, 75, 60],
          theta: ['Defense', 'Attack', 'Midfield', 'Possession', 'Set Pieces', 'Discipline'],
          type: 'scatterpolar',
          fill: 'toself',
          name: 'Visiting Team',
          marker: { color: 'rgba(255, 99, 71, 0.7)' }
        }
      ],
      layout: {
        title: 'Team Performance Comparison',
        polar: {
          radialaxis: {
            visible: true,
            range: [0, 100]
          }
        },
        showlegend: true
      }
    },
    bubble_chart: {
      type: 'scatter',
      title: 'Player Performance Bubble Chart',
      data: [
        {
          x: [7.8, 7.2, 8.5, 7.9, 7.6, 7.5, 7.3, 6.8, 7.1, 6.7],
          y: [9, 0, 1, 1, 0, 0, 0, 0, 0, 0],
          text: ['Jonelle Barron', 'Haley Pratt', 'Sarah Sirkin', 'Gracie Fitzgerald', 'Shivani Beall', 'Arielle Williamson', 'Caroline Kolski', 'Kylie Hall', 'Brooke Smithson', 'Kennedy Cline'],
          mode: 'markers',
          type: 'scatter',
          marker: {
            size: [45, 36, 42, 39, 38, 37, 36, 34, 35, 33],
            color: ['rgba(65, 105, 225, 0.7)', 'rgba(255, 99, 71, 0.7)', 'rgba(65, 105, 225, 0.7)', 'rgba(65, 105, 225, 0.7)', 'rgba(255, 99, 71, 0.7)', 'rgba(255, 99, 71, 0.7)', 'rgba(255, 99, 71, 0.7)', 'rgba(255, 99, 71, 0.7)', 'rgba(65, 105, 225, 0.7)', 'rgba(65, 105, 225, 0.7)']
          }
        }
      ],
      layout: {
        title: 'Player Performance Bubble Chart',
        xaxis: { title: 'Player Rating' },
        yaxis: { title: 'Key Statistics (Goals/Saves)' }
      }
    },
    stacked_bar: {
      type: 'bar',
      title: 'Team Performance by Half',
      data: [
        {
          x: ['First Half', 'Second Half'],
          y: [23, 29],
          name: 'Away Team Actions',
          type: 'bar',
          marker: { color: 'rgba(255, 99, 71, 0.7)' }
        },
        {
          x: ['First Half', 'Second Half'],
          y: [17, 19],
          name: 'Home Team Actions',
          type: 'bar',
          marker: { color: 'rgba(65, 105, 225, 0.7)' }
        },
        {
          x: ['First Half', 'Second Half'],
          y: [1, 1],
          name: 'Official Actions',
          type: 'bar',
          marker: { color: 'rgba(100, 100, 100, 0.7)' }
        }
      ],
      layout: {
        title: 'Team Performance by Half',
        barmode: 'stack',
        xaxis: { title: 'Match Half' },
        yaxis: { title: 'Number of Actions' }
      }
    },
    shot_map: {
      type: 'scatter',
      title: 'Shot Map',
      data: [
        {
          x: [0.2, 0.5, 0.8, 0.3, 0.7, 0.4, 0.6, 0.2, 0.9, 0.5, 0.3, 0.7, 0.1, 0.8, 0.4, 0.6, 0.3, 0.5, 0.7, 0.2, 0.6, 0.4, 0.8, 0.3, 0.7, 0.5, 0.9],
          y: [0.5, 0.8, 0.3, 0.7, 0.2, 0.9, 0.4, 0.6, 0.5, 0.3, 0.8, 0.1, 0.7, 0.4, 0.6, 0.2, 0.9, 0.5, 0.3, 0.8, 0.4, 0.7, 0.2, 0.6, 0.5, 0.8, 0.3],
          mode: 'markers',
          type: 'scatter',
          marker: {
            size: 12,
            color: ['red', 'blue', 'red', 'blue', 'red', 'blue', 'red', 'blue', 'red', 'blue', 'red', 'blue', 'red', 'blue', 'red', 'blue', 'red', 'blue', 'red', 'blue', 'red', 'blue', 'red', 'blue', 'red', 'blue', 'red'],
            symbol: ['circle', 'circle', 'circle', 'circle', 'circle', 'circle', 'circle-open', 'circle-open', 'circle-open', 'circle-open', 'circle-open', 'circle-open', 'circle-open', 'circle-open', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x']
          },
          text: ['Goal', 'Save', 'Miss', 'Save', 'Miss', 'Save', 'Miss', 'Save', 'Miss', 'Save', 'Miss', 'Save', 'Miss', 'Save', 'Miss', 'Save', 'Miss', 'Save', 'Miss', 'Save', 'Miss', 'Save', 'Miss', 'Save', 'Miss', 'Save', 'Miss']
        }
      ],
      layout: {
        title: 'Shot Map',
        xaxis: { title: 'Field Position (X)', range: [0, 1] },
        yaxis: { title: 'Field Position (Y)', range: [0, 1] }
      }
    },
    possession_time_series: {
      type: 'scatter',
      title: 'Possession Over Time',
      data: [
        {
          x: ['0:00', '5:00', '10:00', '15:00', '20:00', '25:00', '30:00', '35:00', '40:00', '45:00', '50:00', '55:00', '60:00', '65:00', '70:00', '75:00', '80:00', '85:00', '90:00'],
          y: [50, 52, 48, 55, 60, 58, 55, 53, 58, 60, 57, 55, 53, 52, 50, 53, 55, 57, 54],
          type: 'scatter',
          mode: 'lines',
          name: 'Away Team',
          line: { width: 3, color: 'rgba(255, 99, 71, 0.8)' }
        },
        {
          x: ['0:00', '5:00', '10:00', '15:00', '20:00', '25:00', '30:00', '35:00', '40:00', '45:00', '50:00', '55:00', '60:00', '65:00', '70:00', '75:00', '80:00', '85:00', '90:00'],
          y: [50, 48, 52, 45, 40, 42, 45, 47, 42, 40, 43, 45, 47, 48, 50, 47, 45, 43, 46],
          type: 'scatter',
          mode: 'lines',
          name: 'Home Team',
          line: { width: 3, color: 'rgba(65, 105, 225, 0.8)' }
        }
      ],
      layout: {
        title: 'Possession Over Time',
        xaxis: { title: 'Match Time' },
        yaxis: { title: 'Possession %', range: [30, 70] },
        legend: { x: 0.02, y: 0.98 }
      }
    },
    player_contributions: {
      type: 'sunburst',
      title: 'Player Contributions',
      data: [
        {
          labels: ["Match", "Centre College", "Emory University", "Sarah Sirkin", "Gracie Fitzgerald", "Jonelle Barron", "Others (Centre)", "Shivani Beall", "Arielle Williamson", "Caroline Kolski", "Others (Emory)"],
          parents: ["", "Match", "Match", "Centre College", "Centre College", "Centre College", "Centre College", "Emory University", "Emory University", "Emory University", "Emory University"],
          values: [100, 52, 38, 15, 12, 10, 15, 12, 10, 8, 8],
          type: 'sunburst',
          branchvalues: 'total',
          marker: {
            colors: ['#FFFFFF', 'rgba(255, 99, 71, 0.8)', 'rgba(65, 105, 225, 0.8)', '#FF6347', '#FF6347', '#FF6347', '#FF6347', '#4169E1', '#4169E1', '#4169E1', '#4169E1']
          },
          textinfo: 'label+percent entry'
        }
      ],
      layout: {
        title: 'Player Contributions',
        margin: { l: 0, r: 0, b: 0, t: 30 }
      }
    },
    team_stats_comparison: {
      type: 'bar',
      title: 'Team Statistics Comparison',
      data: [
        {
          x: ['Shots', 'Shots on Target', 'Possession', 'Pass Completion', 'Fouls', 'Yellow Cards'],
          y: [12, 8, 54.3, 82.1, 7, 1],
          name: 'Centre College',
          type: 'bar',
          marker: { color: 'rgba(255, 99, 71, 0.7)' }
        },
        {
          x: ['Shots', 'Shots on Target', 'Possession', 'Pass Completion', 'Fouls', 'Yellow Cards'],
          y: [15, 9, 45.7, 78.3, 7, 2],
          name: 'Emory University',
          type: 'bar',
          marker: { color: 'rgba(65, 105, 225, 0.7)' }
        }
      ],
      layout: {
        title: 'Team Statistics Comparison',
        barmode: 'group',
        xaxis: { title: 'Statistic' },
        yaxis: { title: 'Value' }
      }
    },
    player_ratings_comparison: {
      type: 'bar',
      title: 'Player Ratings Comparison',
      data: [
        {
          x: ['Jonelle Barron', 'Sarah Sirkin', 'Gracie Fitzgerald', 'Brooke Smithson', 'Kennedy Cline'],
          y: [7.8, 8.5, 7.9, 7.1, 6.7],
          name: 'Centre College',
          type: 'bar',
          marker: { color: 'rgba(255, 99, 71, 0.7)' }
        },
        {
          x: ['Haley Pratt', 'Shivani Beall', 'Arielle Williamson', 'Caroline Kolski', 'Kylie Hall'],
          y: [7.2, 7.6, 7.5, 7.3, 6.8],
          name: 'Emory University',
          type: 'bar',
          marker: { color: 'rgba(65, 105, 225, 0.7)' }
        }
      ],
      layout: {
        title: 'Player Ratings Comparison',
        barmode: 'group',
        xaxis: { title: 'Player' },
        yaxis: { title: 'Rating' }
      }
    },
    play_distribution_by_period: {
      type: 'bar',
      title: 'Play Distribution by Period',
      data: [
        {
          x: ['Shot - Saved', 'Shot - Missed', 'Substitution', 'Corner Kick', 'Goal', 'Foul'],
          y: [8, 7, 12, 2, 1, 8],
          name: 'Period 1',
          type: 'bar',
          marker: { color: 'rgba(255, 159, 64, 0.7)' }
        },
        {
          x: ['Shot - Saved', 'Shot - Missed', 'Substitution', 'Corner Kick', 'Foul', 'Yellow Card'],
          y: [7, 5, 10, 2, 6, 3],
          name: 'Period 2',
          type: 'bar',
          marker: { color: 'rgba(75, 192, 192, 0.7)' }
        }
      ],
      layout: {
        title: 'Play Distribution by Period',
        barmode: 'group',
        xaxis: { title: 'Play Type' },
        yaxis: { title: 'Count' }
      }
    },
    shot_accuracy_gauge: {
      type: 'indicator',
      title: 'Shot Accuracy',
      data: [
        {
          type: 'indicator',
          mode: 'gauge+number',
          value: 66.7,
          title: { text: 'Centre College Shot Accuracy', font: { size: 24 } },
          gauge: {
            axis: { range: [null, 100], tickwidth: 1, tickcolor: 'darkblue' },
            bar: { color: 'rgba(255, 99, 71, 0.8)' },
            bgcolor: 'white',
            borderwidth: 2,
            bordercolor: 'gray',
            steps: [
              { range: [0, 30], color: 'rgba(255, 0, 0, 0.6)' },
              { range: [30, 70], color: 'rgba(255, 165, 0, 0.6)' },
              { range: [70, 100], color: 'rgba(0, 128, 0, 0.6)' }
            ],
            threshold: {
              line: { color: 'red', width: 4 },
              thickness: 0.75,
              value: 66.7
            }
          }
        }
      ],
      layout: {
        title: 'Centre College Shot Accuracy',
        width: 400,
        height: 300,
        margin: { t: 25, r: 25, l: 25, b: 25 }
      }
    },
    shot_accuracy_gauge_emory: {
      type: 'indicator',
      title: 'Shot Accuracy',
      data: [
        {
          type: 'indicator',
          mode: 'gauge+number',
          value: 60.0,
          title: { text: 'Emory University Shot Accuracy', font: { size: 24 } },
          gauge: {
            axis: { range: [null, 100], tickwidth: 1, tickcolor: 'darkblue' },
            bar: { color: 'rgba(65, 105, 225, 0.8)' },
            bgcolor: 'white',
            borderwidth: 2,
            bordercolor: 'gray',
            steps: [
              { range: [0, 30], color: 'rgba(255, 0, 0, 0.6)' },
              { range: [30, 70], color: 'rgba(255, 165, 0, 0.6)' },
              { range: [70, 100], color: 'rgba(0, 128, 0, 0.6)' }
            ],
            threshold: {
              line: { color: 'red', width: 4 },
              thickness: 0.75,
              value: 60.0
            }
          }
        }
      ],
      layout: {
        title: 'Emory University Shot Accuracy',
        width: 400,
        height: 300,
        margin: { t: 25, r: 25, l: 25, b: 25 }
      }
    }
  }
};