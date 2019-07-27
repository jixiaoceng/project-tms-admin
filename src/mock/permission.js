export default [
  {
    'title': '教学',
    'url': '',
    'pid': '0',
    'icon': 'icon-systemManage',
    'level': '1',
    'private': '1',
    'children': [
      {
        'title': '上课管理',
        'url': '',
        'pid': '1',
        'icon': 'ppIcon-class',
        'level': '2',
        'private': '1',
        'children': [
          {
            'title': '上课安排',
            'url': '/classManagement/scheduling',
            'pid': '2',
            'icon': '',
            'level': '3',
            'private': '1'
          }
        ]
      },
      {
        'title': '学生管理',
        'url': '',
        'pid': '1',
        'icon': 'ppIcon-student',
        'level': '2',
        'private': '1',
        'children': [
          {
            'title': '学生列表',
            'url': '/studentManagement/studentList',
            'pid': '2',
            'icon': '',
            'level': '3',
            'private': '1'
          }
        ]
      }
    ]
  }
]
