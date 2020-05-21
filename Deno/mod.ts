// => Variables
// console.log(Deno.Signal);
// console.log(Deno.signals);
// console.log(Deno.permissions);
// console.log(Deno.pid); // => 当前正在运行的进程 ID
// console.log(Deno.args); // => 包含脚本参数
// console.log(Deno.build); // => 构建的相关信息
// console.log(Deno.errors); // => 一些 Error 构造函数的集合，当 Deno API 抛出错误时会用到这些异常
// console.log(Deno.noColor); // => 显示环境变量 NO_COLOR 的值
// console.log(Deno.stdin); // => 用于 stdin 的 Deno.File 实例
// console.log(Deno.stderr); // => 用于 stderr 的 Deno.File 实例
// console.log(Deno.stdout); // => 用于 stdout 的 Deno.File 实例
// console.log(Deno.version); // => Deno 的详细版本信息。包括了 deno、v8、typescript

// => Functions
// console.log(Deno.applySourceMap({ fileName: 'C:\\Users\\15066\\Desktop\\zhenzhen-Study\\Deno\\mod.ts', lineNumber: 5, columnNumber: 15 }));
// console.log(await Deno.bundle('mod.ts'));
// Deno.chdir("C:\\Users\\15066\\Desktop\\zhenzhen-Study");
// await Deno.chmod('C:\\Users\\15066\\Desktop\\zhenzhen-Study', 0o777); // => Windows 未支持、异步
// Deno.chmodSync('C:\\Users\\15066\\Desktop\\zhenzhen-Study', 0o777); // => Windows 未支持、同步
// await Deno.chown('C:\\Users\\15066\\Desktop\\zhenzhen-Study', 1000, 1002);
// Deno.chownSync('C:\\Users\\15066\\Desktop\\zhenzhen-Study', 1000, 1002);

/* 使用给定的资源 ID (rid) 来关闭先前创建或打开的文件。 为避免资源泄露，事关重大，文件应当用完即关。
  const file = await Deno.open('./mod.ts');
  console.log(file);
  Deno.close(file.rid); // 与 "file" 对象一起使用
*/

// console.log(await Deno.connect({ hostname: 'golang.org', port: 80, transport: 'tcp' })); // => 通过指定传输协议连接主机名和端口号，并异步返回这个连接

/* 从 src 拷贝文件至 dst，返回一个 Promise, 成功时 resolve 并返回拷贝的字节数，失败时 reject 并返回拷贝过程中的首个异常。
  const source = await Deno.open('./mod.txt');
  const buffer = new Deno.Buffer();
  const copy = await Deno.copy(source, buffer);
  console.log(source);
  console.log(buffer);
  console.log(copy); 
*/

// => 将一个文件的内容和权限复制到另一个指定的路径，默认情况下根据需要创建新文件（文件不存在）或者覆盖原文件（文件存在且有内容）
// await Deno.copyFile('./mod.txt', './mod3.txt');
// Deno.copyFileSync('./mod.txt', './mod3.txt'); => 同步

// => 创建文件并异步返回一个 Deno.File 实例，如果文件已存在则进行覆盖。
// const file = await Deno.create('./abc.ts');
// console.log(file);
// console.log(Deno.createSync('./abc.ts')); // => 同步

// console.log(Deno.cwd()); // => 返回当前工作目录的字符串

// console.log(Deno.dir('download')); // => 返回特定于用户和平台的目录

// => 返回调用时环境变量的快照。如果更改环境变量对象的属性，则会在进程的环境中设置该属性。环境变量对象只接受 string 类型的值
// console.log(Deno.env.toObject());
// console.log(Deno.env.get('MyAge'));
// Deno.env.set('MyAge', '22');
// console.log(Deno.env.get('MyAge'));
// console.log(Deno.env.toObject());

// console.log(Deno.execPath()); // => 返回当前 deno 可执行文件的路径
// Deno.exit(5); // => 退出 Deno 进程，可以指定退出码，若无则为 0

/* => 格式化诊断信息数组，并以用户友好的格式将其作为单个字符串返回
  const [diagnostics, record] = await Deno.compile('./mod.ts');
  console.log(Deno.formatDiagnostics(diagnostics as any));
*/

/* => 监听一个或多个路径的文件系统事件
  const it = Deno.watchFs('/');
  for await (const event of it) {
    console.log(event);
  } 
*/

// console.log(Deno.hostname()); // => 获取 Deno 进程所在的计算机主机名

// console.log(Deno.isatty(Deno.openSync('./mod.ts').rid)); // => 检查指定的资源 rid 是否为终端
// await Deno.link('./mod.ts', './mod2.ts'); // => 创建 newPath 作为 oldPath 的硬链接
// Deno.linkSync('./mod.ts', './mod2.ts'); // => 同步

// console.log(Deno.listen({ port: 3333 })); // => 在本地监听网络连接
// console.log(Deno.listenTls()); // => 在本地监听来自 TLS 的网络连接
// console.log(Deno.loadavg()); // => 平均负载度
// console.log(await Deno.lstat('./mod.ts')); // => 解析给定的 path，并返回 Deno.FileInfo
// console.log(Deno.lstatSync('./mod.ts')); // => 同步
// console.log(await Deno.makeTempDir({ dir: './', prefix: 'zhenzhen', suffix: '123' })); // => 创建临时文件夹
// console.log(Deno.makeTempDirSync({ dir: './', prefix: 'zhenzhen' })); // => 同步
// console.log(await Deno.makeTempFile({ dir: './', suffix: '.txt' })); // => 创建临时文件
// console.log(Deno.makeTempFileSync({ dir: './', suffix: '.txt' })); // => 同步
// console.log(Deno.metrics()); // => 这主要用于 Deno 的开发
// await Deno.mkdir('newDir'); // => 创建新目录 （文件夹已存在则报错）
// Deno.mkdirSync("newDDD") // => 同步
// console.log(Deno.osRelease()); // => 返回操作系统的发行版本
// console.log(await Deno.open('./mod.ts')); // => 打开一个文件并异步返回一个 Deno.File 实例
// console.log(Deno.openSync("./mod.ts")); // => 同步

// => 打开并初始化插件
// console.log(Deno.openPlugin('C:\\Users\\15066\\Desktop\\zhenzhen-Rush\\server\\.deno_plugins\\deno_mongo_7117ccb53f8978e745db83130ae27b42.dll'));

/* => 从资源 rid 读取内容，并写入到数组缓冲区
  const { rid } = Deno.openSync('./mod.ts');
  const buffer = new Uint8Array(100000);
  const result = await Deno.read(rid, buffer);
  // const result = Deno.readSync(rid, buffer); // => 同步
  console.log(result);
  console.log(new TextDecoder().decode(buffer));
*/

// => 读取并将文件的全部内容解析为字节数组。 TextDecoder 可以在需要的情况下可以将字节转换成字符串
// console.log(new TextDecoder("UTF-8").decode(Deno.readFileSync('./mod.ts')));
// console.log(new TextDecoder('UTF-8').decode(await Deno.readFile('./mod.ts'))); // => 异步

// => 读取 path 文件目录，并返回 Deno.DirEntry 迭代器（包含文件名，是否是文件、文件夹）
// for await (const dir of Deno.readDir('../')) { // => 异步
// for (const dir of Deno.readDirSync('../')) {
//   console.log(dir);
// }
// await Deno.remove('./sss.ts'); // => 删除指定的文件或目录
// Deno.removeSync('./sss.ts'); // => 同步

// await Deno.rename('./aaa.ts', '../Array/bbb.ts'); // => 重命名并移动
// Deno.renameSync('./aaa.ts', '../Array/bbb.ts'); // => 同步
// console.log(Deno.resources()); // => 返回打开的文件资源 rid 及其字符串表示形式的 Map
