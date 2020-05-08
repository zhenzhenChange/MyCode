declare let zhenzhenzhen: boolean;

interface Process {
  exit(code?: number): void;
}
declare let process: Process;

// 添加一个方法到 Window 接口
interface Window {
  HelloWorld(): void;
}

// Math 全局变量
declare var Math: Math;
interface Math {
  seedRandom(seed?: string): void;
}
