import os
os.chdir('wumpus')
for f in os.listdir():
    print('''
        {{
            name:'{}',
            value:'{}'
        }},
        '''.format(f.split('.')[0], f), end=''
    )
    

