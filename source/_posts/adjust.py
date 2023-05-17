import os
import time
for maindir, subdir, file_name_list in os.walk('./'):
    for filename in file_name_list:
        if filename.split('.')[1] == 'md':
            apath = os.path.join(maindir, filename)
            print(apath)
            with open(apath, 'r+', encoding='UTF-8') as f:
                list1 = f.readlines()
                f.seek(0)
                del(list1[0:2])
                list1.insert(5, '---\n')
                f.writelines(list1)
