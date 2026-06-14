export interface ThermalAISpecs {
  backbone: {
    name: string;
    variants: { name: string; params: string; gflops: string }[];
    inputSize: string;
    strides: string;
    activation: string;
  };
  detectionHead: {
    type: string;
    anchors: string;
    outputPerAnchor: string;
  };
  thermalHead: {
    input: string;
    layers: string[];
    output: string;
    params: string;
    lossFunction: string;
  };
  priorityNMS: {
    rules: string[];
    params: Record<string, string>;
  };
  lossFunction: {
    components: { name: string; formula: string; weight: string }[];
    totalFormula: string;
  };
  trainingPipeline: {
    stages: { name: string; epochs: string; lr: string; thermalHead: string; purpose: string }[];
    hyperparams: Record<string, string>;
  };
  temperatureEstimation: {
    roiRegions: { name: string; description: string }[];
    corrections: { name: string; formula: string }[];
    confidenceFormula: string;
  };
  autoAnnotation: {
    steps: { name: string; description: string; model: string }[];
    config: Record<string, string>;
  };
  dataset: {
    source: string;
    totalImages: number;
    classes: { name: string; train: number; val: number; test: number }[];
    split: string;
  };
  deployment: {
    formats: { name: string; speed: string; platform: string; memory: string }[];
    apiEndpoints: { endpoint: string; method: string; description: string }[];
  };
  augmentations: {
    standard: { name: string; probability: string; params: string }[];
    thermal: { name: string; probability: string; description: string }[];
  };
}

export interface AcousticAISpecs {
  backbone: {
    name: string;
    inputSize: string;
    patchEmbed: string;
    blocks: number;
    dModel: string;
    heads: string;
    dFf: string;
    convKernel: string;
    output: string;
  };
  heads: {
    name: string;
    architecture: string;
    input: string;
    output: string;
    params: string;
  }[];
  fusion: {
    name: string;
    inputs: string[];
    architecture: string;
    output: string;
  };
  reasoner: {
    name: string;
    blocks: number;
    architecture: string;
    output: string;
  };
  outputHeads: {
    name: string;
    layers: string;
    outputShape: string;
    activation: string;
  }[];
  dspConfig: Record<string, string>;
  features: { name: string; description: string }[];
  trainingPipeline: {
    stages: { name: string; epochs: string; lr: string; batchSize: string; description: string }[];
    lossFormula: string;
    lossComponents: { name: string; formula: string; weight: string }[];
    augmentations: { name: string; probability: string; params: string }[];
    optimizer: Record<string, string>;
  };
  inference: {
    postProcessing: { name: string; description: string }[];
    streaming: string[];
  };
  safety: {
    watchdog: string[];
    degradation: { trigger: string; fallback: string }[];
    fallbackModel: {
      name: string;
      architecture: string;
      params: string;
      output: string;
    };
  };
  deployment: {
    target: Record<string, string>;
    compression: string[];
    communications: string[];
  };
  parameterBreakdown: { component: string; params: string }[];
}

export interface HazardAISpecs {
  model: {
    type: string;
    objective: string;
    classes: string[];
    hyperparams: Record<string, string>;
    treeStructure: { metric: string; value: string }[];
  };
  features: {
    inputModes: { name: string; features: string }[];
    calibration: { sensor: string; gas: string; formula: string; clipRange: string }[];
    scalerParams: { feature: string; scaler: string; params: string }[];
    derived: { name: string; formula: string }[];
  };
  training: {
    stages: { step: string; details: string }[];
    tuningGrid: Record<string, string>;
    evaluation: { metric: string; value: string }[];
    confusionMatrix: { actual: string; predicted: Record<string, number> }[];
    classMetrics: { class: string; precision: number; recall: number; f1: number; specificity: number; support: number }[];
    featureImportance: { feature: string; importance: number }[];
  };
  ruleEngine: {
    high: { rule: string; condition: string; message: string }[];
    medium: { rule: string; condition: string; message: string }[];
    low: string[];
  };
  recommendation: { risk: string; action: string; oshaRef: string }[];
  api: {
    endpoints: { endpoint: string; method: string; auth: string; description: string }[];
    inputSchema: Record<string, string>;
    outputFields: string[];
    security: string[];
    prometheusMetrics: string[];
  };
  explainability: {
    primary: string;
    fallback: string;
    output: string[];
  };
  monitoring: {
    logging: string[];
    drift: string[];
    alerts: string[];
    incidents: string;
    registry: string;
  };
  deployment: {
    targets: { name: string; ram: string; flash: string; cpu: string; formats: string }[];
    optimizations: string[];
    infrastructure: string[];
  };
  dataset: {
    columns: { name: string; type: string; range: string }[];
    classDistribution: { name: string; percentage: number }[];
    totalRows: number;
    split: string;
  };
  compliance: string[];
  fmea: { category: string; failureModes: string; mitigation: string }[];
}

export interface StructuralAISpecs {
  pipeline: {
    input: { sensor: string; channels: string[]; sampleRate: string; windowSize: string; stride: string; classes: string[] };
    preprocessing: { name: string; description: string }[];
    augmentation: { name: string; params: string }[];
  };
  features: {
    timeDomain: { name: string; description: string }[];
    frequencyDomain: { name: string; description: string }[];
    orientation: { name: string; description: string }[];
    total: string;
  };
  models: {
    cnnBigru: {
      name: string;
      params: string;
      stages: { name: string; architecture: string; output: string }[];
    };
    tinyCnn: {
      name: string;
      params: string;
      architecture: string;
    };
    xgboost: {
      name: string;
      hyperparams: Record<string, string>;
      inputFeatures: string;
    };
    ensemble: {
      method: string;
      weightedFormula: string;
      metaLearner: string;
    };
  };
  training: {
    cnn: Record<string, string>;
    xgboost: Record<string, string>;
    ensemble: string[];
  };
  inference: {
    pipeline: string[];
    riskEngine: { probability: string; risk: string; action: string; color: string }[];
    alertManager: { severity: string; risk: string; channels: string; requiresAck: string }[];
    sensorMonitor: { check: string; threshold: string }[];
  };
  deployment: {
    exportFormats: { format: string; description: string }[];
    edgeTargets: { device: string; model: string; latency: string; size: string; ensemble: string }[];
    api: { method: string; path: string; input: string; output: string }[];
  };
  evaluation: {
    metrics: string[];
    targets: { metric: string; target: string }[];
    explainability: string[];
  };
  safety: {
    uncertainty: string[];
    gracefulDegradation: string[];
    humanOverride: string;
    sensorHealth: string[];
  };
  mlops: Record<string, string>;
}

export interface AssistantAISpecs {
  coreModels: {
    primary: { name: string; params: Record<string, string> };
    embedding: { name: string; params: Record<string, string> };
    reranker: { name: string; params: Record<string, string> };
  };
  inferenceEngine: {
    backends: { name: string; description: string; config: Record<string, string> }[];
    hardware: { hardware: string; model: string; quantization: string; maxLen: string }[];
    generation: Record<string, string>;
    lora: Record<string, string>;
  };
  pipeline: {
    stages: { name: string; description: string; color: string }[];
    flow: string[];
  };
  rag: {
    chunking: Record<string, string>;
    vectorStore: { component: string; spec: string }[];
    knowledge: { source: string; path: string; priority: number }[];
    docCount: number;
    topics: string[];
  };
  safetyRules: {
    id: string;
    rule: string;
    severity: string;
    threshold: string;
    color: string;
  }[];
  overrideActions: string[];
  validation: {
    check: string;
    method: string;
  }[];
  deployment: {
    services: { name: string; port: string; description: string }[];
    network: string;
    volumes: string[];
  };
  dataFlow: string[];
  mlops: Record<string, string>;
}

export interface AIModel {
  id: string;
  name: string;
  purpose: string;
  inputs: string[];
  outputs: string[];
  architecture: string;
  dataset: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  latency: string;
  icon: string;
  color: string;
  thermalSpecs?: ThermalAISpecs;
  acousticSpecs?: AcousticAISpecs;
  hazardSpecs?: HazardAISpecs;
  structuralSpecs?: StructuralAISpecs;
  assistantSpecs?: AssistantAISpecs;
}

export const aiModels: AIModel[] = [
  {
    id: "thermal",
    name: "Thermal Survivor Detection AI",
    purpose: "End-to-end system for detecting humans, cats, and cars in thermal imagery and estimating body temperature from detected human regions. Uses a zero-shot auto-annotation pipeline (Grounding DINO + SAM) to bootstrap training, followed by YOLO-based detection with a custom thermal temperature regression head.",
    inputs: ["Thermal Camera Frames (640×480)", "SeekThermal / FLIR JPEG", "Temporal Sequences"],
    outputs: ["Bounding Boxes + Classes", "Per-Instance Temperature (°C)", "Priority Scores", "Rescue Alerts"],
    architecture: "YOLO26-Thermal — CSPDarknet backbone + PAN-FPN + Decoupled Detection Head + Custom Thermal Head (MLP) + Priority NMS",
    dataset: "5,800 thermal images (SeekThermal + FLIR), 3 classes: Human, Cat, Car. 80/20 train/val split. YOLO format with temperature annotations.",
    accuracy: 96.8,
    precision: 95.2,
    recall: 97.1,
    f1Score: 96.1,
    latency: "3ms (GPU) / 15ms (Jetson)",
    icon: "Thermometer",
    color: "#ef4444",
    thermalSpecs: {
      backbone: {
        name: "CSPDarknet + PAN-FPN",
        variants: [
          { name: "n", params: "3.2M", gflops: "8.7" },
          { name: "s", params: "11.2M", gflops: "28.6" },
          { name: "m", params: "25.9M", gflops: "78.9" },
          { name: "l", params: "43.7M", gflops: "165.2" },
          { name: "x", params: "68.2M", gflops: "257.8" },
        ],
        inputSize: "640×640×3",
        strides: "[8, 16, 32] — P3, P4, P5",
        activation: "SiLU (Swish) + BatchNorm",
      },
      detectionHead: {
        type: "Decoupled (2 parallel Conv branches per scale)",
        anchors: "Anchor-free, task-aligned assigner",
        outputPerAnchor: "4×reg_max (DFL) + num_classes (4)",
      },
      thermalHead: {
        input: "P4 feature map (512ch, 20×20 at 640px)",
        layers: [
          "Conv1×1 (512→128) + BN + ReLU",
          "Conv1×1 (128→128) + BN + ReLU",
          "ROI Crop + AdaptiveAvgPool2d(1×1)",
          "MLP (128→128→64→1)",
          "Clamp (20°C – 45°C)",
        ],
        output: "Temperature in °C (clamped 20–45)",
        params: "~35K",
        lossFunction: "Huber (δ=1.0), human-only, weight=2.0",
      },
      priorityNMS: {
        rules: [
          "Humans can suppress any class at IoU > 0.5",
          "Non-humans can never suppress humans",
          "Humans preserved at confidence ≥ 0.15",
          "Human confidence boosted by 1.5× (capped at 1.0)",
        ],
        params: {
          iou_threshold: "0.5",
          human_boost_threshold: "0.15",
          max_detections: "100",
          human_final_boost: "1.5×",
        },
      },
      lossFunction: {
        components: [
          { name: "Classification (Weighted MSE)", formula: "MSE(cls_pred, cls_target)", weight: "1.0×" },
          { name: "Box Regression (Weighted MSE)", formula: "MSE(box_pred, box_target) × human_boost", weight: "7.5×" },
          { name: "Temperature (Huber)", formula: "HuberLoss(δ=1.0)(temp_pred, temp_target)", weight: "0.5×" },
          { name: "DFL", formula: "Distribution Focal Loss", weight: "1.5×" },
        ],
        totalFormula: "1.0×cls + 7.5×box + 1.5×dfl + 0.5×temp",
      },
      trainingPipeline: {
        stages: [
          { name: "Detection", epochs: "100", lr: "1e-3", thermalHead: "Frozen", purpose: "Learn detection first" },
          { name: "Joint", epochs: "50", lr: "1e-4", thermalHead: "Unfrozen", purpose: "Joint detection + temperature" },
          { name: "Refinement", epochs: "30", lr: "5e-5", thermalHead: "Unfrozen", purpose: "Fine-tune all parameters" },
        ],
        hyperparams: {
          batch_size: "8",
          optimizer: "AdamW",
          scheduler: "Cosine annealing",
          warmup_epochs: "3",
          weight_decay: "5e-4",
          mixed_precision: "AMP",
          gradient_accumulation: "2 steps",
        },
      },
      temperatureEstimation: {
        roiRegions: [
          { name: "Forehead", description: "Top 20% bbox, center 60% width" },
          { name: "Face", description: "Top 55% bbox, center 70% width, 10% offset" },
          { name: "Body", description: "Center 80% of bbox" },
          { name: "Hottest", description: "Top 5% percentile pixels in body ROI" },
        ],
        corrections: [
          { name: "Emissivity", formula: "T_corrected = ((T_k⁴ − (1−ε)·T_refl⁴) / ε)^0.25" },
          { name: "Atmospheric", formula: "T_corrected = ((T_k⁴ − (1−τ)·T_atm⁴) / τ)^0.25" },
          { name: "Distance", formula: "T += 12.5·log₂(d/d_ref)" },
          { name: "Ambient Drift", formula: "T −= (T_ambient − T_ref)" },
        ],
        confidenceFormula: "0.4×in_target + 0.3×stability + 0.3×buffer",
      },
      autoAnnotation: {
        steps: [
          { name: "Grounding DINO", description: "Zero-shot detection with text prompts", model: "IDEA-Research/grounding-dino-base" },
          { name: "SAM", description: "Segment Anything for mask refinement", model: "sam_vit_h_4b8939.pth" },
          { name: "Thermal Scoring", description: "+0.15 confidence for human-range temps", model: "—" },
          { name: "Iterative Refinement", description: "3 rounds at thresholds [0.9, 0.7, 0.5]", model: "—" },
        ],
        config: {
          box_threshold: "0.30",
          text_threshold: "0.25",
          nms_threshold: "0.50",
          min_area: "256 px²",
        },
      },
      dataset: {
        source: "SeekThermal + FLIR cameras",
        totalImages: 5800,
        classes: [
          { name: "Human", train: 1817, val: 160, test: 161 },
          { name: "Cat", train: 1817, val: 160, test: 161 },
          { name: "Car", train: 1296, val: 115, test: 113 },
        ],
        split: "80% train (4,640) / 20% val (1,160)",
      },
      deployment: {
        formats: [
          { name: "PyTorch", speed: "3ms", platform: "Desktop GPU", memory: "2.8GB" },
          { name: "ONNX (FP32)", speed: "5ms", platform: "CPU/GPU", memory: "1.0GB" },
          { name: "TensorRT (FP16)", speed: "1–2ms", platform: "NVIDIA GPU", memory: "0.8GB" },
          { name: "TensorRT (FP16)", speed: "15ms", platform: "Jetson Orin NX", memory: "0.5GB" },
          { name: "TensorRT (INT8)", speed: "8ms", platform: "Jetson Orin NX", memory: "0.3GB" },
        ],
        apiEndpoints: [
          { endpoint: "/health", method: "GET", description: "Service health + model status" },
          { endpoint: "/detect", method: "POST", description: "Single image detection" },
          { endpoint: "/detect_mobile", method: "POST", description: "Detection + base64 annotated frame" },
          { endpoint: "/video_feed", method: "GET", description: "MJPEG stream" },
          { endpoint: "/stream", method: "WebSocket", description: "Bidirectional stream" },
        ],
      },
      augmentations: {
        standard: [
          { name: "Mosaic", probability: "1.0", params: "4-image composite" },
          { name: "MixUp", probability: "0.1", params: "Image blending" },
          { name: "HSV-H", probability: "1.0", params: "±0.015" },
          { name: "Scale", probability: "1.0", params: "±50%" },
          { name: "Flip LR", probability: "0.5", params: "Horizontal" },
          { name: "RandomResizedCrop", probability: "0.5", params: "Scale 0.5–1.0" },
        ],
        thermal: [
          { name: "ThermalNoise", probability: "0.15", description: "Gaussian σ(0.005–0.03) + salt & pepper (0.5%)" },
          { name: "TemperatureJitter", probability: "0.15", description: "Global intensity shift ±(0.1–0.5)×255" },
          { name: "HeatDistortion", probability: "0.10", description: "Sinusoidal warping (atmospheric haze)" },
          { name: "ThermalBlur", probability: "0.10", description: "Gaussian kernel (3–7)" },
          { name: "ThermalOcclusion", probability: "0.10", description: "Random hot/cold blocks" },
          { name: "SpecularReflection", probability: "0.05", description: "Simulated metal reflections" },
        ],
      },
    },
  },
  {
    id: "acoustic",
    name: "Acoustic Survivor Detection AI",
    purpose: "Detect survivor sounds including calls, knocking, and breathing patterns in noisy disaster environments",
    inputs: ["Audio Signals (44.1kHz)", "Spectral Features (Mel Spectrograms)"],
    outputs: ["Voice Activity Detection", "Distress Signal Classification", "Survivor Confidence Score"],
    architecture: "1D-CNN + LSTM hybrid architecture with multi-head attention for temporal pattern recognition. Mel-spectrogram preprocessing with custom noise-robust feature extraction pipeline.",
    dataset: "Combined dataset: 20,000 audio clips (10s each) including human calls, breathing, knocking, footsteps mixed with disaster background noise (collapse, fire, wind).",
    accuracy: 94.3,
    precision: 93.7,
    recall: 95.0,
    f1Score: 94.3,
    latency: "120ms",
    icon: "AudioLines",
    color: "#7c3aed",
    acousticSpecs: {
      backbone: {
        name: "ConformerS",
        inputSize: "(B, 1, 128, T) — mono log-mel spectrogram",
        patchEmbed: "Patch size 16, stride 8 → t = T//8 patches, dim 2048 → d_model=256",
        blocks: 12,
        dModel: "256",
        heads: "8 (MHSA with RoPE)",
        dFf: "1024 (split as 2×512 in ½FFN)",
        convKernel: "31 (depthwise)",
        output: "(B, T', 256)",
      },
      heads: [
        {
          name: "KnockTCN",
          architecture: "Linear(256→64) → 5× DilatedConvBlock [dilations 1,2,4,8,16,32] → TemporalSelfAttention(4 heads) → MLP(64→1) → Sigmoid",
          input: "(B, T, 256)",
          output: "knock_prob (B,T), knock_emb (B,T,64)",
          params: "~0.9M",
        },
        {
          name: "VocalDetector",
          architecture: "Linear(256→32) → 4× Conv1D [32,64,128,128] → TransformerEncoder(2 layers, 4 heads, d=128) → MLP(128→1) → Sigmoid",
          input: "(B, T, 256)",
          output: "vocal_prob (B,T), vocal_emb (B,T,128)",
          params: "~2.1M",
        },
        {
          name: "AnomalyDetector (VQ-VAE)",
          architecture: "Encoder(256→128→32) → 2× VectorQuantizer(256 codes, dim=32) → Decoder(32→128→256). Anomaly = MSE(recon, input) − 0.1×perplexity",
          input: "(B, T, 256)",
          output: "anomaly_score (B,T), perplexity, z_anom (B,64)",
          params: "~0.1M",
        },
        {
          name: "Spatial/Modulation",
          architecture: "ILD (6 ch pairs × freq bins) + IPD (6 pairs) + Magnitude-squared coherence + AM decomposition at 20 modulation freqs (0.5–30 Hz)",
          input: "(B, T, 256) + multi-channel audio",
          output: "spatial (B,T,32), modulation (B,T,32)",
          params: "~0.1M",
        },
      ],
      fusion: {
        name: "GatedHierarchicalFusion",
        inputs: ["knock(64)", "vocal(128)", "anomaly(64)", "spatial(32)", "modulation(32)"],
        architecture: "Each → Linear(head→64) → Concat(5×64=320) → CrossAttention(4 heads) → GateNet(640→5) → Sigmoid gates → Σ(gate_i × projected_i) → MLP(64→32→1)",
        output: "fused_logits (B,), gates (B,5), h_fused (B,64)",
      },
      reasoner: {
        name: "Mamba2Reasoner",
        blocks: 4,
        architecture: "InputProj(64→128) → 4× Mamba2Block [LayerNorm → SelectiveSSM (Conv1d→SiLU→dt, A/B/C/D, recurrent scan) → residual → FFN(128→256) → residual] → Optional BiLSTM(2 layers, 64-dim) with gate → OutputProj(128→64)",
        output: "(B, T', 64)",
      },
      outputHeads: [
        { name: "survivor_head", layers: "Linear(64→1)", outputShape: "(B,)", activation: "Sigmoid (T~1.5)" },
        { name: "pattern_head", layers: "Linear(64→4)", outputShape: "(B, 4)", activation: "Softmax" },
        { name: "heatmap_head", layers: "Linear(64→256)", outputShape: "(B, T, 256)", activation: "Softmax over time" },
        { name: "location_head", layers: "Linear(64→64→2)", outputShape: "(B,) azimuth, (B,) elevation", activation: "Identity" },
      ],
      dspConfig: {
        "Sample Rate": "48 kHz, 24-bit",
        "Mic Array": "4-channel tetrahedral, radius 3 cm",
        "Framing": "2048 samples (~42.7 ms), hop 512 (~10.7 ms)",
        "Windowing": "Hann (primary), Blackman-Harris (alt)",
        "Beamforming": "MVDR-GSC with SRP-PHAT DOA",
        "Noise Suppression": "TinyCRNN DNN mask (8K params) → fallback Wiener filter",
        "Dereverberation": "WPE",
        "AGC": "Enabled, 10 ms lookahead",
      },
      features: [
        { name: "LogMelSpectrogram", description: "48k, n_fft=2048, hop=512, n_mels=128, f_min=20, f_max=22k" },
        { name: "PCEN", description: "alpha=0.98, delta=2.0, r=0.5, learnable per-channel smoothing" },
        { name: "Spectral", description: "Centroid, rolloff(85%), flux, contrast (6 bands)" },
        { name: "Spatial", description: "ILD (6 pairs), IPD (6 pairs), magnitude-squared coherence" },
        { name: "Modulation", description: "AM decomposition at 20 modulation frequencies (0.5–30 Hz)" },
        { name: "Temporal", description: "Zero-crossing rate, subband correlation, energy per frame" },
      ],
      trainingPipeline: {
        stages: [
          { name: "SSL Pretrain", epochs: "100", lr: "5e-4", batchSize: "256", description: "Masked spectrogram reconstruction (50%), L1 loss, warmup 10K, accum 8" },
          { name: "Supervised FT", epochs: "50", lr: "1e-4", batchSize: "64", description: "Multi-task loss, cosine schedule, warmup 2K" },
          { name: "Curriculum", epochs: "—", lr: "—", batchSize: "—", description: "5 SNR stages: [10,30]→[0,10]→[-5,0]→[-15,-5]→[-15,30]" },
          { name: "Hard Neg Mining", epochs: "—", lr: "—", batchSize: "—", description: "Top 5% false positives re-weighted 3× every 5K steps" },
          { name: "Adversarial", epochs: "—", lr: "—", batchSize: "—", description: "PGD attack, ε=0.01, 7 steps, step=0.003" },
        ],
        lossFormula: "1.0×BCE(survivor) + 2.0×BCE(knock) + 1.5×BCE(vocal) + 0.5×MSE(DOA)",
        lossComponents: [
          { name: "Survivor Detection", formula: "BCEWithLogitsLoss", weight: "1.0×" },
          { name: "Knock Pattern", formula: "BCEWithLogitsLoss", weight: "2.0×" },
          { name: "Vocal Detection", formula: "BCEWithLogitsLoss", weight: "1.5×" },
          { name: "DOA Estimation", formula: "MSELoss (azimuth + elevation)", weight: "0.5×" },
        ],
        augmentations: [
          { name: "Time Stretch", probability: "0.3", params: "rate 0.8–1.2" },
          { name: "Pitch Shift", probability: "0.3", params: "±3 semitones" },
          { name: "Noise Injection", probability: "0.7", params: "SNR -5 to 15 dB" },
          { name: "Mixup", probability: "0.3", params: "α=0.2, batch-level" },
          { name: "Clipping", probability: "0.1", params: "threshold 1–10% of max" },
        ],
        optimizer: {
          "Optimizer": "AdamW (β=(0.9, 0.95))",
          "Weight Decay": "0.01 (no decay on bias/LayerNorm)",
          "Scheduler": "Linear warmup → Cosine annealing to 0",
          "AMP": "Mixed-precision via GradScaler",
          "Gradient Clipping": "1.0",
        },
      },
      inference: {
        postProcessing: [
          { name: "Adaptive Threshold", description: "base(0.5) + 0.3×(1 − SNR_norm), SNR_norm maps [−10,20] dB → [0,1]" },
          { name: "Hysteresis", description: "Requires 2 consecutive frames above threshold" },
          { name: "Consistency", description: "≥3 detections in last 30 frames" },
          { name: "Final Alert", description: "hysteresis AND consistency" },
        ],
        streaming: [
          "Threaded processing with input/output queues",
          "30-second circular audio buffer",
          "Async frame feeding, non-blocking prediction retrieval",
        ],
      },
      safety: {
        watchdog: [
          "Heartbeat monitor (1s interval, 5s timeout)",
          "Memory (>80%) and CPU (>90%) health tracking",
          "Health score [0–100], degraded if <50",
        ],
        degradation: [
          { trigger: "Mic loss 4→3→2→1", fallback: "Progressively reduces beamforming" },
          { trigger: "Model failure", fallback: "TinyCRNNFallback (8K params)" },
          { trigger: "Full degradation", fallback: "full → reduced_beamforming → monaural → cpu_fallback" },
        ],
        fallbackModel: {
          name: "TinyCRNNFallback",
          architecture: "Conv2d(1→8, k=3) → Conv2d(8→8, k=3) → AdaptiveAvgPool(8×8) → Linear(512→32) → GRU(32→32) → Linear(32→1) → Sigmoid",
          params: "8K",
          output: "p_survivor only (no multi-head outputs)",
        },
      },
      deployment: {
        target: {
          "Platform": "Jetson Orin Nano",
          "Precision": "INT8 (TensorRT)",
          "Model Size": "16 MB weights, 32 MB workspace",
          "Latency Target": "P50 < 500ms, P99 < 2000ms",
          "Frame Interval": "42.7 ms",
        },
        compression: [
          "Quantization (INT8)",
          "Structured pruning (2 heads, FF=512)",
          "Knowledge distillation (6 student blocks)",
        ],
        communications: [
          "WiFi mesh (primary)",
          "LoRa (backup)",
          "4G USB (emergency)",
          "MQTT topic: rescue/detection",
        ],
      },
      parameterBreakdown: [
        { component: "ConformerS (12 blocks, d=256, h=8, ff=1024)", params: "~15.8M" },
        { component: "KnockTCN (5 blocks + temporal SA)", params: "~0.9M" },
        { component: "VocalDetector (Conv + Transformer)", params: "~2.1M" },
        { component: "AnomalyDetector (VQ-VAE, 2×256 codes)", params: "~0.1M" },
        { component: "GatedHierarchicalFusion", params: "~0.1M" },
        { component: "Mamba2Reasoner (4 blocks + BiLSTM)", params: "~0.7M" },
        { component: "OutputHeads (4 heads)", params: "~0.03M" },
        { component: "Total (OmniRescue)", params: "~19.7M" },
        { component: "Fallback TinyCRNN", params: "8K" },
      ],
    },
  },
  {
    id: "hazard",
    name: "Environmental Hazard Assessment AI",
    purpose: "Evaluate environmental safety levels and provide protective equipment recommendations in real-time",
    inputs: ["Toxic Gas Levels (CO, H2S, CH4)", "Humidity (%)", "Temperature (°C)", "Air Quality Index"],
    outputs: ["Risk Level (1-5)", "Safety Warnings", "PPE Recommendations", "Evacuation Zones"],
    architecture: "Ensemble model combining Gradient Boosted Trees for tabular sensor data with a lightweight MLP for multi-modal fusion. Real-time inference with safety-critical thresholding.",
    dataset: "Multi-source dataset: 50,000 sensor readings from industrial disaster simulations, emergency response databases, and EPA environmental monitoring stations.",
    accuracy: 97.5,
    precision: 96.8,
    recall: 98.0,
    f1Score: 97.4,
    latency: "15ms",
    icon: "ShieldAlert",
    color: "#f97316",
    hazardSpecs: {
      model: {
        type: "XGBoost Classifier",
        objective: "multi:softprob (softmax cross-entropy multiclass)",
        classes: ["LOW", "MEDIUM", "HIGH"],
        hyperparams: {
          n_estimators: "200",
          max_depth: "8",
          learning_rate: "0.1",
          subsample: "0.8",
          colsample_bytree: "0.8",
          min_child_weight: "3",
          objective: "multi:softprob",
          eval_metric: "mlogloss",
          tree_method: "hist",
          random_state: "42",
          n_jobs: "-1",
        },
        treeStructure: [
          { metric: "Total Trees", value: "200" },
          { metric: "Max Depth/Tree", value: "8" },
          { metric: "Max Nodes/Tree", value: "511" },
          { metric: "Max Total Nodes", value: "102,200" },
          { metric: "Memory/Node", value: "~64 bytes" },
          { metric: "Features/Tree", value: "~12 (colsample=0.8×15)" },
        ],
      },
      features: {
        inputModes: [
          { name: "Mode A — Direct PPM", features: "co_ppm, co2_ppm, ch4_ppm, h2s_ppm, humidity, temperature" },
          { name: "Mode B — Raw MQ ADC", features: "mq2_raw, mq135_raw, humidity, temperature → calibrated internally" },
        ],
        calibration: [
          { sensor: "MQ-2 → CO", gas: "CO", formula: "10^((log10(mq2_raw)×1.53−0.77)/0.073)", clipRange: "[0, 1000]" },
          { sensor: "MQ-135 → CO₂", gas: "CO₂", formula: "1.2×(mq135_raw^0.6)", clipRange: "[300, 10000]" },
          { sensor: "MQ-135 → CH₄", gas: "CH₄", formula: "3.8×(mq135_raw^0.45)", clipRange: "[0, 10000]" },
          { sensor: "MQ-135 → H₂S", gas: "H₂S", formula: "0.8×(mq135_raw^0.35)", clipRange: "[0, 100]" },
        ],
        scalerParams: [
          { feature: "humidity", scaler: "MinMax [0,1]", params: "min=20.03, max=100.0" },
          { feature: "temperature", scaler: "MinMax [0,1]", params: "min=10.03, max=69.97" },
          { feature: "co_ppm", scaler: "Robust [5,95]", params: "center=36.15, scale=173.84" },
          { feature: "co2_ppm", scaler: "Robust [5,95]", params: "center=1512.25, scale=8349.37" },
          { feature: "ch4_ppm", scaler: "Robust [5,95]", params: "center=790.19, scale=8598.39" },
          { feature: "h2s_ppm", scaler: "Robust [5,95]", params: "center=7.68, scale=51.58" },
        ],
        derived: [
          { name: "co_co2_ratio", formula: "co_ppm / (co2_ppm + 1e-8)" },
          { name: "ch4_h2s_ratio", formula: "ch4_ppm / (h2s_ppm + 1e-8)" },
          { name: "co_ch4_ratio", formula: "co_ppm / (ch4_ppm + 1e-8)" },
          { name: "whi_co", formula: "co_ppm / 200.0" },
          { name: "whi_h2s", formula: "h2s_ppm / 20.0" },
          { name: "whi_ch4", formula: "ch4_ppm / 5000.0" },
          { name: "whi_temp", formula: "max(0, (temperature−35.0)/25.0)" },
          { name: "hazard_score", formula: "whi_co×0.35 + whi_h2s×0.30 + whi_ch4×0.25 + whi_temp×0.10" },
          { name: "heat_index", formula: "temperature − 0.55×(1−humidity/100)×(temperature−14.5)" },
        ],
      },
      training: {
        stages: [
          { step: "Load", details: "HazardDataLoader — validates columns, types, nulls, label set" },
          { step: "Feature Engineering", details: "FeatureEngineer.fit_transform() → 15 feature matrix" },
          { step: "Label Encode", details: "LabelEncoder → LOW=0, MEDIUM=1, HIGH=2" },
          { step: "Split", details: "train_test_split(test_size=0.2, stratify=y, random_state=42) → 8000/2000" },
          { step: "Tuning", details: "GridSearchCV with StratifiedKFold(3), scoring f1_macro" },
          { step: "Train", details: "model.fit(X_train, y_train, eval_set=[(X_test, y_test)])" },
          { step: "Evaluate", details: "accuracy, precision/recall/f1, confusion matrix, ROC-AUC" },
          { step: "Export", details: "model.joblib, model.onnx, label_encoder.joblib, shap_explainer.joblib" },
        ],
        tuningGrid: {
          max_depth: "[4, 6, 8, 10]",
          learning_rate: "[0.05, 0.1, 0.2]",
          n_estimators: "[100, 200, 300]",
          subsample: "[0.7, 0.8, 1.0]",
        },
        evaluation: [
          { metric: "Accuracy", value: "0.9986" },
          { metric: "Balanced Accuracy", value: "0.9985" },
          { metric: "Precision (macro)", value: "0.9984" },
          { metric: "Recall (macro)", value: "0.9985" },
          { metric: "F1 (macro)", value: "0.9985" },
          { metric: "ROC-AUC (OVR)", value: "0.999995" },
          { metric: "Cohen's Kappa", value: "0.9979" },
          { metric: "Matthews CC", value: "0.9979" },
        ],
        confusionMatrix: [
          { actual: "HIGH", predicted: { HIGH: 3916, LOW: 0, MEDIUM: 5 } },
          { actual: "LOW", predicted: { HIGH: 0, LOW: 3590, MEDIUM: 4 } },
          { actual: "MEDIUM", predicted: { HIGH: 5, LOW: 0, MEDIUM: 2480 } },
        ],
        classMetrics: [
          { class: "HIGH", precision: 0.9987, recall: 0.9987, f1: 0.9987, specificity: 0.9992, support: 3921 },
          { class: "LOW", precision: 1.0, recall: 0.9989, f1: 0.9994, specificity: 1.0, support: 3594 },
          { class: "MEDIUM", precision: 0.9964, recall: 0.998, f1: 0.9972, specificity: 0.9988, support: 2485 },
        ],
        featureImportance: [
          { feature: "hazard_score", importance: 0.6777 },
          { feature: "co2_ppm", importance: 0.0966 },
          { feature: "ch4_ppm", importance: 0.0802 },
          { feature: "whi_ch4", importance: 0.0398 },
          { feature: "h2s_ppm", importance: 0.0229 },
        ],
      },
      ruleEngine: {
        high: [
          { rule: "CO critical", condition: "CO > 200 ppm", message: "Immediate hazard — evacuate" },
          { rule: "H₂S critical", condition: "H₂S > 20 ppm", message: "Immediate hazard — evacuate" },
          { rule: "CH₄ critical", condition: "CH₄ > 5000 ppm", message: "Explosion risk — evacuate" },
          { rule: "Temperature critical", condition: "Temp > 60°C", message: "Heat stress — evacuate" },
        ],
        medium: [
          { rule: "CO warning", condition: "50 < CO ≤ 200 ppm", message: "Increase ventilation" },
          { rule: "H₂S warning", condition: "10 < H₂S ≤ 20 ppm", message: "Monitor closely" },
          { rule: "CH₄ warning", condition: "1000 < CH₄ ≤ 5000 ppm", message: "Ventilation required" },
          { rule: "CO₂ warning", condition: "CO₂ > 5000 ppm", message: "Poor air quality" },
          { rule: "Humidity warning", condition: "Humidity > 85%", message: "Sensor degradation risk" },
          { rule: "Temperature warning", condition: "45 ≤ Temp ≤ 60°C", message: "Monitor for heat stress" },
        ],
        low: ["All thresholds below warning levels"],
      },
      recommendation: [
        { risk: "LOW", action: "Normal operation — continue monitoring", oshaRef: "1910.134(a)(1)" },
        { risk: "MEDIUM", action: "Increase ventilation and monitor (5-step protocol)", oshaRef: "1910.146" },
        { risk: "HIGH", action: "Wear SCBA and evacuate area (9-step protocol)", oshaRef: "1910.134(g)" },
      ],
      api: {
        endpoints: [
          { endpoint: "/health", method: "GET", auth: "No", description: "Liveness check" },
          { endpoint: "/predict", method: "POST", auth: "Yes", description: "Single inference → Rules → Recommendation" },
          { endpoint: "/predict/batch", method: "POST", auth: "Yes", description: "Batch (max 100)" },
          { endpoint: "/explain", method: "POST", auth: "Yes", description: "SHAP-based explanation" },
          { endpoint: "/rules", method: "GET", auth: "No", description: "Active rule config" },
          { endpoint: "/metrics", method: "GET", auth: "No", description: "Prometheus metrics" },
        ],
        inputSchema: {
          co_ppm: "float [0, 1000]",
          co2_ppm: "float [300, 10000]",
          ch4_ppm: "float [0, 10000]",
          h2s_ppm: "float [0, 100]",
          humidity: "float [0, 100]",
          temperature: "float [-20, 80]",
        },
        outputFields: ["risk_level", "recommendation", "confidence", "probability_distribution", "reasons", "rule_overrides"],
        security: ["X-API-Key header", "Constant-time comparison", "SlowAPI rate limiting", "Pydantic validation", "Audit log"],
        prometheusMetrics: [
          "hazard_predictions_total{risk_level}",
          "hazard_inference_latency_seconds",
          "hazard_rule_triggers_total{rule_name}",
          "hazard_errors_total{error_type}",
        ],
      },
      explainability: {
        primary: "SHAP TreeExplainer — per-feature attribution per class",
        fallback: "XGBoost feature_importances_ (gain)",
        output: ["risk_level", "confidence", "probability_distribution", "reasons", "feature_contributions (top 6)", "rule_engine results", "proximity alerts"],
      },
      monitoring: {
        logging: ["JSONL to logs/predictions.jsonl", "JSONL to logs/errors.jsonl", "JSONL to logs/audit.jsonl", "JSONL to logs/incidents.jsonl"],
        drift: ["PSI (threshold 0.25)", "KS test (p=0.05)"],
        alerts: ["Webhook (Slack/PagerDuty)", "300s cooldown"],
        incidents: "SQLite data/incidents.db — tracks type, severity, readings, prediction, override, resolution",
        registry: "File-based, semver auto-increment, states: active/staged/archived/failed, auto-rollback",
      },
      deployment: {
        targets: [
          { name: "ESP32", ram: "512 KB", flash: "4 MB", cpu: "240 MHz", formats: "TFLite INT8" },
          { name: "Raspberry Pi 4", ram: "4 GB", flash: "32 GB", cpu: "1.5 GHz", formats: "ONNX / joblib / TFLite" },
          { name: "Industrial Gateway", ram: "8 GB", flash: "64 GB", cpu: "2 GHz", formats: "ONNX / joblib / TFLite" },
        ],
        optimizations: ["INT8 quantization", "Tree depth pruning", "Feature subset selection", "Rule-engine-only mode for ultra-low-resource"],
        infrastructure: ["Docker multi-stage builds", "docker-compose (API + edge + Prometheus + Grafana + Redis)", "GitHub Actions CI/CD", "Prometheus scrape config"],
      },
      dataset: {
        columns: [
          { name: "mq2_raw", type: "float64", range: "~0–1000" },
          { name: "mq135_raw", type: "float64", range: "~0–1000" },
          { name: "humidity", type: "float64", range: "0–100" },
          { name: "temperature", type: "float64", range: "-20 to 80" },
          { name: "co_ppm", type: "float64", range: "0–1000" },
          { name: "co2_ppm", type: "float64", range: "300–10000" },
          { name: "ch4_ppm", type: "float64", range: "0–10000" },
          { name: "h2s_ppm", type: "float64", range: "0–100" },
          { name: "risk_level", type: "string", range: "LOW/MEDIUM/HIGH" },
        ],
        classDistribution: [
          { name: "HIGH", percentage: 39.21 },
          { name: "LOW", percentage: 35.94 },
          { name: "MEDIUM", percentage: 24.85 },
        ],
        totalRows: 10000,
        split: "80/20 stratified (8000 train / 2000 test)",
      },
      compliance: ["OSHA 1910.134", "OSHA 1910.146", "OSHA 1910.120", "NFPA 704", "NFPA 72", "ISA-95/IEC 62264", "ISO 45001", "IEC 61508"],
      fmea: [
        { category: "Sensor Failures", failureModes: "Drift, saturation, loss", mitigation: "Calibration checks, redundancy, graceful degradation" },
        { category: "Communication Failures", failureModes: "WiFi, MQTT, DNS, latency", mitigation: "Multi-protocol fallback, local caching, retry logic" },
        { category: "Model Failures", failureModes: "Outdated, corrupted, OOD, overflow, OOM", mitigation: "Model registry, versioning, auto-rollback, input validation" },
        { category: "Safety-Critical", failureModes: "False negatives", mitigation: "Upward-only rule override (never downgrade ML risk)" },
      ],
    },
  },
  {
    id: "structural",
    name: "Structural Collapse Risk AI",
    purpose: "Predict structural instability and estimate safe zones using vibration and IMU sensor data",
    inputs: ["MPU6050 Accelerometer Data", "Gyroscope Readings", "Vibrational Frequency Patterns"],
    outputs: ["Collapse Probability (%)", "Safe Zone Map", "Risk Classification (Low/Med/High/Critical)"],
    architecture: "Temporal Convolutional Network (TCN) with residual connections for vibration pattern analysis. Multi-task learning head for simultaneous collapse prediction and safe zone estimation.",
    dataset: "Structural monitoring dataset: 30,000 vibration samples from controlled demolition monitoring, earthquake simulation labs, and structural health monitoring systems.",
    accuracy: 95.1,
    precision: 94.5,
    recall: 95.8,
    f1Score: 95.1,
    latency: "50ms",
    icon: "Building2",
    color: "#eab308",
    structuralSpecs: {
      pipeline: {
        input: {
          sensor: "MPU6050 6-axis IMU",
          channels: ["Ax", "Ay", "Az", "Gx", "Gy", "Gz"],
          sampleRate: "100 Hz",
          windowSize: "500 timesteps (5 seconds)",
          stride: "10 timesteps (100ms, 90% overlap)",
          classes: ["stable", "minor_movement", "significant_movement", "collapse_warning", "collapse_event"],
        },
        preprocessing: [
          { name: "Calibration", description: "Scale + offset correction per channel" },
          { name: "Butterworth Lowpass", description: "4th-order, 20 Hz cutoff" },
          { name: "Butterworth Highpass", description: "2nd-order, 0.1 Hz cutoff" },
          { name: "Madgwick AHRS", description: "Orientation estimation via quaternion gradient descent (β=0.1)" },
          { name: "World-frame Rotation", description: "Rotates accelerometer to world coordinates using Euler angles" },
          { name: "Gravity Removal", description: "Subtracts [0,0,1] from world-frame acceleration" },
        ],
        augmentation: [
          { name: "Gaussian Noise", params: "σ = 0.01 × channel std" },
          { name: "Time Warping", params: "max warp = 0.1 (cubic interpolation)" },
          { name: "Rotation", params: "±5° random Euler rotation on accelerometer" },
          { name: "Magnitude Warping", params: "σ = 0.05 (cubic spline)" },
          { name: "Sensor Dropout", params: "5% channel dropout" },
        ],
      },
      features: {
        timeDomain: [
          { name: "RMS", description: "Root mean square per channel" },
          { name: "Variance", description: "Signal variance per channel" },
          { name: "Std Dev", description: "Standard deviation per channel" },
          { name: "Peak Acceleration", description: "Max absolute value per channel" },
          { name: "Crest Factor", description: "Peak / RMS ratio per channel" },
          { name: "Zero Crossing Rate", description: "Number of zero crossings per channel" },
          { name: "Jerk", description: "Mean absolute derivative per channel" },
        ],
        frequencyDomain: [
          { name: "Dominant Frequency", description: "Argmax of FFT magnitude per channel" },
          { name: "Spectral Entropy", description: "Normalized Welch PSD Shannon entropy per channel" },
          { name: "Energy Bands", description: "Energy in [0.1-4Hz, 4-8Hz, 8-15Hz, 15-30Hz, 30-50Hz] via Welch's method" },
        ],
        orientation: [
          { name: "Tilt Angle", description: "Mean arccos of normalized az" },
          { name: "Roll", description: "Mean arctan2 of ay, az" },
          { name: "Pitch", description: "Mean arctan2 of -ax, sqrt(ay²+az²)" },
          { name: "Angular Velocity Energy", description: "Sum of squared gyro" },
          { name: "Angular Acceleration", description: "Mean absolute diff × fs" },
        ],
        total: "89 raw → deduplicated to 53 unique features",
      },
      models: {
        cnnBigru: {
          name: "CNN-BiGRU",
          params: "~1.2M",
          stages: [
            { name: "Multi-Scale Conv1D", architecture: "3 parallel Conv1D(64, k=[3,7,15]) → Concat → BN → ReLU", output: "500×192" },
            { name: "Residual Block", architecture: "Conv1D(128, k=1) → Conv1D(128, k=3, dil=2) → BN → ReLU → Conv1D(128, k=3) → BN → Add → ReLU → AvgPool(2)", output: "250×128" },
            { name: "Dilated Conv + SE", architecture: "Conv1D(256, k=3, dil=4) → BN → ReLU → SEBlock(16) → AvgPool(2)", output: "125×256" },
            { name: "BiGRU", architecture: "Bidirectional(GRU(32)) → Bidirectional(GRU(16))", output: "125×32" },
            { name: "Attention Pooling", architecture: "Dense(1,tanh)→Softmax→Multiply → GAP + GMaxP → Concat", output: "64-dim" },
            { name: "Classifier", architecture: "Dense(64)→BN→ReLU→Drop(0.25) → Dense(32)→BN→ReLU→Drop(0.15) → Dense(5,softmax)", output: "5 classes" },
          ],
        },
        tinyCnn: {
          name: "TinyCNN (ESP32-S3)",
          params: "~80KB footprint",
          architecture: "Conv1D(16,k=3,s=2)→ReLU→AvgPool(2) → Conv1D(32,k=3,s=2)→ReLU→AvgPool(2) → Conv1D(64,k=3,s=2)→ReLU→GAP → Dense(16)→Dense(5,softmax)",
        },
        xgboost: {
          name: "XGBoost",
          hyperparams: {
            n_estimators: "200",
            max_depth: "8",
            learning_rate: "0.1",
            subsample: "0.8",
            colsample_bytree: "0.8",
            reg_lambda: "1.0",
            reg_alpha: "0.5",
            objective: "multi:softprob",
            eval_metric: "mlogloss",
            early_stopping_rounds: "25",
          },
          inputFeatures: "53 engineered features per window",
        },
        ensemble: {
          method: "Stacked Meta-Learner (primary) / Weighted Average (fallback)",
          weightedFormula: "P_ensemble = 0.6 × P_cnn + 0.4 × P_xgb",
          metaLearner: "LogisticRegression(solver='lbfgs', C=1.0, penalty='l2', max_iter=1000) trained on 5-fold OOF meta-features [P_cnn(5), P_xgb(5)] → 10-dim",
        },
      },
      training: {
        cnn: {
          loss: "Focal Loss (γ=2.0)",
          optimizer: "AdamW (lr=3e-4, wd=1e-4, β₁=0.9, β₂=0.999)",
          batch_size: "32",
          max_epochs: "200",
          early_stopping: "Patience=25, min_delta=1e-4",
          lr_schedule: "CosineAnnealingWarmRestarts (T₀=10, T_mult=2)",
          warmup: "5 epochs",
          gradient_clipping: "Norm=1.0",
          label_smoothing: "0.1",
          mixed_precision: "Enabled",
          distributed: "MirroredStrategy",
        },
        xgboost: {
          "Early Stopping": "25 rounds on validation mlogloss",
          "Random Seed": "42",
        },
        ensemble: [
          "5-fold stratified stacking",
          "Meta-learner trained on concatenated train + validation meta features",
        ],
      },
      inference: {
        pipeline: [
          "Load model priority: TFLite → Keras → XGBoost → Ensemble",
          "Preprocess: Butterworth → Madgwick AHRS → world rotation → gravity removal",
          "Normalize: Running EMA normalization (decay=0.99)",
          "Extract 53 features → XGBoost → probabilities",
          "CNN forward pass → probabilities",
          "Ensemble: stacking (meta-learner) or weighted average",
          "Post-processing: entropy-based confidence, risk level classification",
        ],
        riskEngine: [
          { probability: "< 0.10", risk: "LOW", action: "Routine monitoring", color: "#22c55e" },
          { probability: "0.10 – 0.30", risk: "MEDIUM", action: "Increase polling frequency", color: "#eab308" },
          { probability: "0.30 – 0.70", risk: "HIGH", action: "Recommend evacuation", color: "#f97316" },
          { probability: "≥ 0.70", risk: "CRITICAL", action: "Mandatory evacuation, activate siren", color: "#ef4444" },
        ],
        alertManager: [
          { severity: "INFO", risk: "LOW", channels: "—", requiresAck: "No" },
          { severity: "WARNING", risk: "MEDIUM", channels: "—", requiresAck: "No" },
          { severity: "CRITICAL", risk: "HIGH", channels: "MQTT, Mobile Push", requiresAck: "Yes" },
          { severity: "EMERGENCY", risk: "CRITICAL", channels: "MQTT, Siren, Mobile Push", requiresAck: "Yes (2-person)" },
        ],
        sensorMonitor: [
          { check: "Frozen Sensor", threshold: "Std < 0.001 for 3+ consecutive windows" },
          { check: "NaN Detection", threshold: "Any NaN in window" },
          { check: "Saturation", threshold: "|Accel| > 15g" },
          { check: "Communication", threshold: "> 2.0s since last read" },
          { check: "Temperature", threshold: "-40°C to 85°C" },
        ],
      },
      deployment: {
        exportFormats: [
          { format: "TensorFlow SavedModel", description: "cnn_bigru_final_tf.keras" },
          { format: "PyTorch state_dict", description: "cnn_bigru_final_torch.pt" },
          { format: "TFLite FP32", description: "cnn_bigru_fp32.tflite" },
          { format: "ONNX", description: "cnn_bigru_final.onnx (via tf2onnx)" },
          { format: "TinyCNN TFLite", description: "tiny_cnn_fp32.tflite / tiny_cnn_int8.tflite" },
          { format: "XGBoost", description: "xgb_model.joblib / .json" },
        ],
        edgeTargets: [
          { device: "Raspberry Pi 4", model: "TFLite INT8 (XNNPACK)", latency: "~15ms", size: "~8MB", ensemble: "No" },
          { device: "Jetson Nano", model: "TensorRT FP16", latency: "~8ms", size: "~15MB", ensemble: "Yes" },
          { device: "Jetson Orin", model: "TensorRT FP16", latency: "~3ms", size: "~15MB", ensemble: "Yes" },
          { device: "ESP32-S3", model: "TFLite Micro (TinyCNN)", latency: "~50ms", size: "~80KB", ensemble: "No" },
        ],
        api: [
          { method: "GET", path: "/health", input: "—", output: "{status, models_loaded}" },
          { method: "POST", path: "/predict", input: "{window: [[500×6]]}", output: "{collapse_probability, risk_level, recommended_action, confidence, uncertainty, risk_color, class_probabilities}" },
          { method: "POST", path: "/predict_batch", input: "{windows: [[N×500×6]]}", output: "{predictions: [...], count}" },
          { method: "GET", path: "/config", input: "—", output: "{input_shape, num_classes, class_names, sampling_rate_hz}" },
        ],
      },
      evaluation: {
        metrics: ["Accuracy", "Precision (macro)", "Recall (macro)", "F1 (macro)", "ROC-AUC (OVR)", "PR-AUC (macro)", "MCC", "Collapse Recall", "Collapse Precision", "Collapse FNR", "Lead Time (avg/min/max/median)"],
        targets: [
          { metric: "Collapse Recall", target: "≥ 0.98" },
          { metric: "Warning Recall", target: "≥ 0.90" },
          { metric: "Minimum Lead Time", target: "≥ 3.0 seconds" },
        ],
        explainability: [
          "SHAP TreeExplainer for XGBoost (summary plots per class)",
          "Gradient-based saliency maps for CNN (class=4 collapse)",
          "Attention weights extraction from attention_weights layer",
        ],
      },
      safety: {
        uncertainty: [
          "MC Dropout: 10 stochastic forward passes",
          "Uncertainty threshold: 0.15",
          "If uncertainty > 0.15: adjusted_prob = smoothed × (1 + uncertainty)",
        ],
        gracefulDegradation: [
          "Falls back to rule-based detection if models fail",
          "Sensor fault escalation: 1.5× multiplier if sensor unhealthy",
          "Confidence-based escalation: HIGH risk with confidence < 0.6 → escalate one level",
        ],
        humanOverride: "Two-person acknowledgment required for CRITICAL alerts",
        sensorHealth: [
          "Frozen sensor: Std < 0.001 for 3+ consecutive windows",
          "NaN detection: Any NaN in window",
          "Saturation: |Accel| > 15g",
          "Communication loss: > 2.0s since last read",
          "Temperature out-of-range: -40°C to 85°C",
        ],
      },
      mlops: {
        "Experiment Tracking": "MLflow",
        "Model Registry": "MLflow Model Registry",
        "Data Versioning": "DVC",
        "Retrain Interval": "Every 7 days",
        "Drift Detection": "KS-test threshold = 0.05",
        "Monitoring": "Model drift, data drift, sensor health",
      },
    },
  },
  {
    id: "assistant",
    name: "NABD360 AI Assistant",
    purpose: "Domain-specific large language model for rescue guidance, safety procedures, and disaster response support",
    inputs: ["Natural Language Queries", "Context Data (Sensor Readings)", "Situation Description"],
    outputs: ["Rescue Guidance", "Safety Procedures", "PPE Recommendations", "Hazard Explanations", "Step-by-step Instructions"],
    architecture: "Fine-tuned Qwen2.5-1.5B / Qwen3-8B decoder-only transformer with Grouped Query Attention (GQA), SwiGLU FFN, RoPE positional encoding. RAG pipeline with sentence-transformers embeddings over FEMA/OSHA/NIOSH knowledge base, deterministic safety rule engine, and multi-layer response validation.",
    dataset: "Curated corpus: 100,000 disaster response documents, FEMA protocols, WHO emergency guidelines, NFPA standards, and annotated Q&A pairs from rescue professionals. 13 documents covering confined space, electrical safety, trench rescue, wilderness rescue, earthquake, fire, flood, structural collapse, CPR/AED, H2S, hazmat, triage, rope rescue.",
    accuracy: 93.2,
    precision: 92.8,
    recall: 94.1,
    f1Score: 93.4,
    latency: "500ms",
    icon: "Bot",
    color: "#00d4ff",
    assistantSpecs: {
      coreModels: {
        primary: {
          name: "Qwen2.5-1.5B-Instruct / Qwen3-8B",
          params: {
            Architecture: "Qwen2ForCausalLM (decoder-only transformer)",
            "Hidden size": "1536",
            "Intermediate size (FFN)": "8960",
            "Hidden layers": "28",
            "Attention heads": "12",
            "KV heads": "2 (GQA 6:1 compression)",
            "Max position embeddings": "32768 (32K context)",
            "Sliding window": "32768 (full attention, 21 max window layers)",
            "Vocab size": "151,936",
            Activation: "SiLU (SwiGLU FFN)",
            Normalization: "RMSNorm (eps=1e-6)",
            "RoPE theta": "1,000,000.0",
            "Tie word embeddings": "True",
            "Torch dtype": "bfloat16",
            "Use KV cache": "True",
            Parameters: "~1.5B (Qwen2.5) / ~8B (Qwen3)",
          },
        },
        embedding: {
          name: "sentence-transformers/all-MiniLM-L6-v2",
          params: {
            Dimension: "384",
            "Max length": "256 tokens",
            Normalization: "L2-normalized (cosine similarity)",
            Device: "CPU default, CUDA optional",
          },
        },
        reranker: {
          name: "BAAI/bge-reranker-v2-m3",
          params: {
            Type: "Cross-encoder",
          },
        },
      },
      inferenceEngine: {
        backends: [
          {
            name: "HuggingFace (dev)",
            description: "AutoModelForCausalLM.from_pretrained() with quantization",
            config: {
              "NF4 (4-bit)": "BitsAndBytesConfig(load_in_4bit=True, bnb_4bit_quant_type='nf4', bnb_4bit_use_double_quant=True)",
              "INT8 (8-bit)": "BitsAndBytesConfig(load_in_8bit=True, llm_int8_threshold=6.0)",
              None: "Full precision",
            },
          },
          {
            name: "vLLM (production)",
            description: "High-throughput serving with tensor parallelism",
            config: {
              Backend: "LLM(model=..., tensor_parallel_size=1, gpu_memory_utilization=0.90, max_model_len=8192)",
            },
          },
        ],
        hardware: [
          { hardware: "RTX 4090 (24GB)", model: "Qwen3-8B", quantization: "NF4", maxLen: "8192" },
          { hardware: "RTX 6000 Ada (48GB)", model: "Qwen3-8B", quantization: "INT8", maxLen: "16384" },
          { hardware: "L40S (48GB)", model: "Qwen3-8B", quantization: "INT8", maxLen: "16384" },
          { hardware: "Jetson AGX Orin", model: "Qwen3-8B", quantization: "NF4", maxLen: "4096" },
          { hardware: "CPU only", model: "Qwen3-8B", quantization: "None (fp32)", maxLen: "2048" },
        ],
        generation: {
          temperature: "0.7",
          top_p: "0.8",
          top_k: "20",
          repetition_penalty: "1.1",
          do_sample: "true",
        },
        lora: {
          "Target modules": "q_proj, k_proj, v_proj, o_proj, gate_proj, up_proj, down_proj",
          "Rank (r)": "16",
          Alpha: "32",
          Dropout: "0.1",
          "Learning rate": "2e-4",
          "Batch size": "4",
          Epochs: "3",
          "Max seq length": "2048",
        },
      },
      pipeline: {
        stages: [
          { name: "Request", description: "User query + context arrives", color: "#94a3b8" },
          { name: "ContextAggregator", description: "Normalize vars, validate ranges, sensor fusion", color: "#a855f7" },
          { name: "SafetyEngine", description: "12 deterministic rules — always overrides LLM", color: "#ef4444" },
          { name: "Retriever", description: "Embed → search → rerank knowledge base", color: "#22c55e" },
          { name: "PromptBuilder", description: "Assemble system + context + RAG + safety", color: "#3b82f6" },
          { name: "InferenceEngine", description: "HF / vLLM generates response", color: "#f97316" },
          { name: "SafetyOverride", description: "Force/block actions from safety engine", color: "#ef4444" },
          { name: "ResponseValidator", description: "Hallucination + protocol + risk checks", color: "#eab308" },
        ],
        flow: [
          "RescueRequest",
          "ContextModel",
          "SafetyVerdict",
          "RetrievedDocuments",
          "Prompt",
          "LLM output",
          "SafetyOverride",
          "RescueResponse (JSON)",
        ],
      },
      rag: {
        chunking: {
          "Chunk size": "768 chars (~192 tokens)",
          "Chunk overlap": "150 chars",
          Separators: "\\n\\n, \\n, ., space, char fallback",
          Strategy: "Recursive character split",
        },
        vectorStore: [
          { component: "Production", spec: "Qdrant v1.7 — HNSW: m=16, ef_construct=200, cosine" },
          { component: "Dev", spec: "FAISS IndexFlatIP → IVF_HNSW (nlist=100, nprobe=10)" },
          { component: "Hybrid alpha", spec: "0.7 dense / 0.3 sparse" },
          { component: "Retrieval top_k", spec: "5" },
          { component: "Reranker top_k", spec: "3" },
          { component: "Score threshold", spec: "0.75" },
        ],
        knowledge: [
          { source: "FEMA US&R", path: "data/knowledge_base/fema/", priority: 1 },
          { source: "OSHA Regulations", path: "data/knowledge_base/osha/", priority: 2 },
          { source: "NIOSH Guidance", path: "data/knowledge_base/niosh/", priority: 3 },
          { source: "Emergency Manuals", path: "data/knowledge_base/emergency/", priority: 4 },
          { source: "Medical Protocols", path: "data/knowledge_base/medical/", priority: 5 },
        ],
        docCount: 13,
        topics: [
          "Confined Space Rescue",
          "Electrical Safety",
          "Trench Rescue",
          "Wilderness Rescue",
          "Earthquake Response",
          "Fire Operations",
          "Flood Response",
          "Structural Collapse",
          "CPR / AED",
          "H2S Safety",
          "Hazmat Response",
          "Triage Protocols",
          "Rope Rescue",
        ],
      },
      safetyRules: [
        { id: "SR-001", rule: "H2S > 100 ppm → evacuation", severity: "CRITICAL", threshold: "> 100 ppm", color: "#ef4444" },
        { id: "SR-002", rule: "H2S > 20 ppm → respirator required", severity: "HIGH", threshold: "> 20 ppm", color: "#f97316" },
        { id: "SR-003", rule: "O2 < 19.5% → SCBA required", severity: "CRITICAL", threshold: "< 19.5%", color: "#ef4444" },
        { id: "SR-004", rule: "CO > 200 ppm → evacuation", severity: "CRITICAL", threshold: "> 200 ppm", color: "#ef4444" },
        { id: "SR-005", rule: "CO > 50 ppm → warning", severity: "HIGH", threshold: "> 50 ppm", color: "#f97316" },
        { id: "SR-006", rule: "CH4 > 5% LEL → explosion risk", severity: "CRITICAL", threshold: "> 5.0%", color: "#ef4444" },
        { id: "SR-007", rule: "Temp > 60°C → thermal hazard", severity: "CRITICAL", threshold: "> 60°C", color: "#ef4444" },
        { id: "SR-008", rule: "Structural risk = HIGH", severity: "CRITICAL", threshold: "equality", color: "#ef4444" },
        { id: "SR-009", rule: "Toxic exposure = CRITICAL", severity: "CRITICAL", threshold: "equality", color: "#ef4444" },
        { id: "SR-010", rule: "NH3 > 300 ppm → evacuation", severity: "CRITICAL", threshold: "> 300 ppm", color: "#ef4444" },
        { id: "SR-011", rule: "CO2 > 40000 ppm → danger", severity: "CRITICAL", threshold: "> 40000 ppm", color: "#ef4444" },
        { id: "SR-012", rule: "Battery < 10% → return to base", severity: "HIGH", threshold: "< 10%", color: "#f97316" },
      ],
      overrideActions: [
        "force_evacuation",
        "prohibit_entry",
        "require_ppe",
        "prohibit_ignition",
        "issue_warning",
        "require_decontamination",
        "block_instruction",
        "modify_instruction",
      ],
      validation: [
        { check: "Hallucination Detection", method: "Claim verification vs retrieved docs" },
        { check: "Protocol Compliance", method: "OSHA/FEMA/NIOSH rule matching" },
        { check: "Risk Validation", method: "Hazard severity vs PPE decisions" },
        { check: "Confidence Scoring", method: "Weighted: retrieval 25% + safety 35% + model 25% + validation 15%" },
      ],
      deployment: {
        services: [
          { name: "API (FastAPI)", port: "8000", description: "Main inference endpoint" },
          { name: "Qdrant", port: "6333-34", description: "Vector database" },
          { name: "Redis", port: "6379", description: "Caching layer" },
          { name: "Prometheus", port: "9090", description: "Metrics collection" },
          { name: "Grafana", port: "3000", description: "Monitoring dashboards" },
        ],
        network: "rescue-net bridge",
        volumes: ["qdrant_storage", "redis_data", "prometheus_data", "grafana_data"],
      },
      dataFlow: [
        "RescueRequest",
        "ContextAggregator (normalize → validate → fuse)",
        "ContextModel",
        "SafetyEngine (12 rules) → SafetyVerdict",
        "Retriever (embed → search → rerank) → RetrievedDocuments",
        "PromptBuilder → Prompt",
        "InferenceEngine (HF/vLLM) → LLM output",
        "SafetyOverride (forced/blocked actions)",
        "ResponseValidator (hallucination + protocol + risk)",
        "RescueInstructionGenerator → JSON RescueResponse",
      ],
      mlops: {
        "Experiment Tracking": "MLflow",
        "Model Registry": "MLflow Model Registry",
        "Data Versioning": "DVC",
        "Retrain Interval": "Every 7 days",
        "Drift Detection": "KS-test threshold = 0.05",
        "Monitoring": "Model drift, data drift, sensor health",
      },
    },
  },
];
