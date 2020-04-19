/*
 * 组合模式：用小的对象构建更大的对象，而小的对象可能又由更小的孙对象构建
 * 1.表示树形结构
 * 2.利用对象多态性统一对待组合对象和单个对象
 * 3.是聚合关系而不是父子关系（组合对象把请求委托给它所包含的叶对象，它们具有相同的接口）
 *
 */

/* 复杂宏命令 */
function MacroCommand() {
  return {
    commands: [],
    add(command) {
      this.commands.push(command);
    },
    execute() {
      console.log(this.commands);
      this.commands.forEach((command) => command.execute());
    },
  };
}

const openAcCommand = {
  execute() {
    console.log('打开空调！');
  },
};

const openTvCommand = {
  execute() {
    console.log('打开电视！');
  },
};

const openSoundCommand = {
  execute() {
    console.log('打开音响！');
  },
};

const closeDoorCommand = {
  execute() {
    console.log('关门！');
  },
};

const openPcCommand = {
  execute() {
    console.log('开电脑！');
  },
};

const loginQQCommand = {
  execute() {
    console.log('登录QQ！');
  },
};

const TvAndSound = MacroCommand();
TvAndSound.add(openTvCommand);
TvAndSound.add(openSoundCommand);

const DoorAndPcAndQQ = MacroCommand();
DoorAndPcAndQQ.add(closeDoorCommand);
DoorAndPcAndQQ.add(openPcCommand);
DoorAndPcAndQQ.add(loginQQCommand);

const AcAndAll = MacroCommand();
AcAndAll.add(openAcCommand);
AcAndAll.add(TvAndSound);
AcAndAll.add(DoorAndPcAndQQ);

setTimeout(() => AcAndAll.execute(), 5000);

/* 扫描文件夹 */
class Folder {
  constructor(name) {
    this.name = name;
    this.parent = null;
    this.files = [];
  }

  add(file) {
    file.parent = this;
    this.files.push(file);
  }

  // 从父级中删除自己
  remove() {
    if (!this.parent) return;

    const parentFiles = this.parent.files;
    for (let i = parentFiles.length - 1; i >= 0; i--) {
      if (parentFiles[i] == this) parentFiles.splice(i, 1);
    }
  }

  scanning() {
    console.log('开始扫描Folder：', this.name);
    this.files.forEach((file) => file.scanning());
  }
}

class File {
  constructor(name) {
    this.name = name;
    this.parent = null;
  }

  scanning() {
    console.log('开始扫描File：', this.name);
  }

  remove() {
    if (!this.parent) return;

    const parentFiles = this.parent.files;
    for (let i = parentFiles.length - 1; i >= 0; i--) {
      if (parentFiles[i] == this) parentFiles.splice(i, 1);
    }
  }
}

const MainFolder = new Folder('学习资料');
const JSFolder = new Folder('JavaScript');
const NodeFolder = new Folder('Node');

const VueFile = new File('Vue.js');
const DesignFile = new File('设计模式');
const NodeFile = new File('Node.js');

JSFolder.add(VueFile);
NodeFolder.add(NodeFile);

MainFolder.add(JSFolder);
MainFolder.add(NodeFolder);
MainFolder.add(DesignFile);

const OtherFolder = new Folder('其他');
const WebPackFile = new File('WebPack');

OtherFolder.add(WebPackFile);

const NestFile = new File('Nest.js');

MainFolder.add(OtherFolder);
MainFolder.add(NestFile);

OtherFolder.remove();

MainFolder.scanning();
