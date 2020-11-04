import os
import psutil
import threading
import sys

global with_usage


def error_print(*args, **kwargs):
    print(*args, file=sys.stderr, **kwargs)


def get_usage(process_list, range1, range2):
    for proc in process_list[range1:range2]:
        try:
            with_usage.append({'pid': proc.pid, 'name': proc.name(), 'usage_cpu': proc.cpu_percent(
                interval=0.1),  'usage_memory': proc.memory_percent()})
        except:
            pass


if __name__ == '__main__':
    with_usage = []
    username = os.getlogin()
    processlist = []
    for pid in psutil.pids():
        process = psutil.Process(pid)
        current_username = ''
        current_status = ''
        try:
            current_status = process.status()
        except:
            continue
        if current_status != 'running':
            continue
        processlist.append(process)
    proc_num = len(processlist)
    threads = []
    multi = 10
    chunks = int(proc_num / multi)  # 한 청크당 긁어모을 개수
    rest = proc_num % multi  # 마지막 청크
    for i in range(0, multi + 1):
        start = i * chunks
        end = start + chunks
        if i == multi:
            end = start + rest
        error_print("프로세스 분석 중...", start + 1, "~", end, "of", proc_num)
        t = threading.Thread(target=get_usage, args=(
            processlist[start: end], 0, 10))
        threads.append(t)
        t.start()
    for thread in threads:
        thread.join()
    res = {
        'result': sorted(with_usage, key=lambda proc: proc['usage_memory'], reverse=True)
    }
    print(json.dumps(res))
