import ffmpeg
import math


def hflip(input_file_path, output_file_path):
    in1 = ffmpeg.input(input_file_path)
    v1 = in1['v'].hflip()
    a1 = in1['a']
    joined = ffmpeg.concat(v1, a1, v=1, a=1).node
    v2 = joined['v']
    a2 = joined['a'].filter('volume', 1.5)
    out = ffmpeg.output(v2, a2, output_file_path)
    out.run()


def get_video_info(input_file_path):
    probe = ffmpeg.probe(input_file_path)
    video_stream = next((stream for stream in probe['streams'] if stream['codec_type'] == 'video'), None)
    width = int(video_stream['width'])
    height = int(video_stream['height'])
    duration = float(video_stream['duration'])
    # print(width, height, duration)
    return video_stream


def clip(input_file_path, output_file_path, clip_start_sec, clip_end_sec):
    instream = ffmpeg.input(input_file_path)
    video = instream['v'].filter('trim', start=clip_start_sec, end=clip_end_sec)\
        .filter('setpts', 'PTS-STARTPTS')
    audio = instream['a'].filter('atrim', start=clip_start_sec, end=clip_end_sec)\
        .filter('asetpts', 'PTS-STARTPTS')
    joined = ffmpeg.concat(video, audio, v=1, a=1).node
    output_frame_rate = 25
    out = ffmpeg.output(joined['v'], output_file_path, r=output_frame_rate)
    out.run()


def clip_split(input_file_path, output_file_path_prefix, split_duration):
    file_extension = '.'+input_file_path.split('.')[-1]
    duration = math.ceil(float(get_video_info(input_file_path)['duration']))
    print('input file is a %s second long "%s"' % (duration, file_extension))
    num_clips = int(duration/split_duration)+1
    clip_split_times = [i for i in range(num_clips)]  # use for debug output
    for num_clip in range(num_clips):
        clip_split_time = num_clip*split_duration
        clip(input_file_path, output_file_path_prefix+str(num_clip)+file_extension,
             clip_split_time, clip_split_time+split_duration)


if __name__ == '__main__':
    print('Running %s' % __file__)
    # hflip('./media/test.mp4', './media/out.mp4')
    # clip('./media/test.mp4', './media/out.mp4', 0, 5)
    # clip_split('./media/test.mp4', './media/test_split', 1)
    # get_video_info('./media/test.mp4')
    # clip_split('./media/test.mp4', './media/out', 5)

