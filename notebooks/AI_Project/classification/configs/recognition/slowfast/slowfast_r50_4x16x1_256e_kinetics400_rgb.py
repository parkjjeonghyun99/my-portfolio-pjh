_base_ = [
    '../../_base_/default_runtime.py'
]

# dataset settings
dataset_type = 'RawframeDataset'
data_root = '/workspace/DATASET/Tmax/CarAccident/view1'
data_root_val = '/workspace/DATASET/Tmax/CarAccident/view1'

ann_file_train = '/workspace/DATASET/Tmax/CarAccident/CarAccident_VideoClassification/train_1st.txt'
ann_file_val = '/workspace/DATASET/Tmax/CarAccident/CarAccident_VideoClassification/val_1st.txt'
ann_file_test = '/workspace/DATASET/Tmax/CarAccident/CarAccident_VideoClassification/val_1st.txt'

img_norm_cfg = dict(
    mean=[123.675, 116.28, 103.53], std=[58.395, 57.12, 57.375], to_bgr=False)

clip_len_setting = 32
frame_interval_setting = 1
num_clips_settting = 1
batch_size = 8
size = (480, 270)
train_pipeline = [
    dict(type='SampleFrames', clip_len=clip_len_setting, frame_interval=frame_interval_setting, num_clips=num_clips_settting),
    #dict(type='SampleFrames', clip_len=clip_len_setting, frame_uniform=True),
    dict(type='RawFrameDecode_B'),
    dict(type='Resize', scale=size),
    dict(type='RandomResizedCrop'),
    dict(type='Resize', scale=size, keep_ratio=False),
    dict(type='Flip', flip_ratio=0.5),
    dict(type='Normalize', **img_norm_cfg),
    dict(type='FormatShape', input_format='NCTHW'),
    dict(type='Collect', keys=['imgs', 'masks', 'label'], meta_keys=[]),
    dict(type='ToTensor', keys=['imgs', 'masks', 'label'])
]
val_pipeline = [
    dict(
        type='SampleFrames',
        clip_len=clip_len_setting,
        frame_interval=frame_interval_setting,
        num_clips=num_clips_settting,
        test_mode=True),
    dict(type='RawFrameDecode_B'),
    dict(type='Resize', scale=size),
    dict(type='Flip', flip_ratio=0),
    dict(type='Normalize', **img_norm_cfg),
    dict(type='FormatShape', input_format='NCTHW'),
    dict(type='Collect', keys=['imgs', 'masks',  'label'], meta_keys=[]),
    dict(type='ToTensor', keys=['imgs', 'masks','label'])
]
test_pipeline = [
    dict(
        type='SampleFrames',
        clip_len=clip_len_setting,
        frame_interval=frame_interval_setting,
        num_clips=num_clips_settting,
        test_mode=True),
    dict(type='RawFrameDecode_B'),
    dict(type='Resize', scale=size),
    dict(type='Flip', flip_ratio=0),
    dict(type='Normalize', **img_norm_cfg),
    dict(type='FormatShape', input_format='NCTHW'),
    dict(type='Collect', keys=['imgs', 'masks','label'], meta_keys=[]),
    dict(type='ToTensor', keys=['imgs', 'masks','label'])
]
data = dict(
    videos_per_gpu=batch_size,
    workers_per_gpu=4,
    train=dict(
        type=dataset_type,
        ann_file=ann_file_train,
        data_prefix=data_root,
        pipeline=train_pipeline),
    val=dict(
        type=dataset_type,
        ann_file=ann_file_val,
        data_prefix=data_root_val,
        pipeline=val_pipeline),
    test=dict(
        type=dataset_type,
        ann_file=ann_file_test,
        data_prefix=data_root_val,
        pipeline=test_pipeline))

evaluation = dict(interval=5, metrics=['top_k_accuracy', 'mean_class_accuracy'], top_k=(1,))

# optimizer
optimizer = dict(
    type='SGD', lr=0.002, momentum=0.9,
    weight_decay=0.0001)  # this lr is used for 8 gpus
optimizer_config = dict(grad_clip=dict(max_norm=40, norm_type=2))
# learning policy
lr_config = dict(
    policy='CosineAnnealing',
    min_lr=0,
    warmup='linear',
    warmup_by_epoch=True,
    warmup_iters=1)

total_epochs = 20

# runtime settings
checkpoint_config = dict(interval=4)
work_dir = './work_dirs/For4_view1'
find_unused_parameters = False
load_from = '/workspace/DATASET/Tmax/CarAcc_Weight/slowfast_r50_256p_4x16x1_256e_kinetics400_rgb_20200728-145f1097.pth'
workflow = [('train', 1), ('val', 1)]