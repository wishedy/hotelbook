/**
 * 功能描述：  登录/注册
 * 使用方法:
 * 注意事件：
 * 引入来源：  作用：
 *
 * Created by ZhangHongDa on 2016/11/21.
 * Mixed by QiangKaiLiang on 2016/12/05
 */
comm.login = {
    show: function() {

        if ($(".loginMain").size() === 0) {
            $("body").append('<section class="loginMain" id="Ev-ydLogin"  style="position:fixed;top:0;left:0;z-index:10">' +
                '    <section class="loginCont">' +
                '        <!--错误提示-->' +
                '        <section class="errorTip" style="display: none;"><span>密码错误</span></section>' +
                '        <!--登录状态--> ' +
                '        <section class="loginWidth ev-login" style="display: ; ">' +
                '            <div class="clear"> <div class="experience">体验一下</div></div>' +
                '            <div class="yd_logo"><img src="/image/authority/login/yiding_logo.png" /></div>' +
                '            <aside class="loginUsername marginTop">' +
                '                 <input type="text" class="ev-phoneNum" placeholder="请输入手机号"/>' +
                '                 <div class="phone"> ' +
                '                       <i class="close"></i>' +
                '                 </div>' +
                '            </aside> ' +
                '            <ul class="history">' +
                '                 <!--<li>16464</li>-->' +
                '            </ul>' +
                '            <aside class="loginUsername clear">' +
                '                 <input type="password" class="ev-passWord" placeholder="请输入6位以上密码"/>' +
                '                 <div class="password"> ' +
                '                       <i class="close"></i>' +
                '                       <i class="eyeClose"></i>' +
                '                       <i class="eyeOpen"></i>' +
                '                 </div>' +
                '            </aside>' +
                '            <div class="phoneFind clear">' +
                '                <div class="phoneLogin">手机快捷登陆<div class="prompt">点击这里使用手机快捷登陆</div> </div>' +
                '                <div class="findPassword">找回密码</div>' +
                '            </div>' +
                '            <div class="loginBtn ev-loginBtn">登录</div>' +
                '            <div class="goOnregister">立即注册</div>' +
                '            <div class="OR"></div>' +
                '            <ul class="unionLogin clear">' +
                '                <li class="weixin">' +
                '                    <div class="icon"><img src="/image/authority/login/login_WeChat.png"> </div>' +
                '                    <div class="text">微信</div>' +
                '                </li>' +
                '                <li class="allin">' +
                '                    <div class="icon"><img src="/image/authority/login/login_allin.png"> </div>' +
                '                    <div class="text">唯医</div>' +
                '                </li>' +
                '                <li class="caos">' +
                '                    <div class="icon"><img src="/image/authority/login/login_caos.png"> </div>' +
                '                    <div class="text">CAOS</div>' +
                '                </li>' +
                '            </ul>' +
                '        </section>' +
                '        <!--登录状态 END-->' +
                '        <!--找回密码-->' +
                '        <section class="loginWidth ev-findPassword" style="display: none;">' +
                '            <section class="loginFixed">' +
                '                <section class="title">找回密码</section>' +
                '                <section class="titleInput clear marginTop">' +
                '                    <div class="titleText">账号</div>' +
                '                    <input class="titleType ev-findNum" placeholder="请输入手机号" />' +
                '                    <div class="phone"> ' +
                '                             <i class="close"></i>' +
                '                       </div>' +
                '                </section>' +
                '                <section class="titleInput clear">' +
                '                    <div class="titleText">验证码</div>' +
                '                    <input class="titleType ev-fidCode" placeholder="请输入验证码" />' +
                '                    <div class="validate ev-finValidate">获取验证码<!--60s后重新获取--><!--重新获取--></div>' +
                '                </section>' +
                '                <div class="loginBtn ev-fidNext">下一步</div>' +
                '                <a class="returnText ev-findReturn" href="javaScript:;">返回上一步</a>' +
                '            </section>' +
                '        </section>' +
                '        <!--找回密码 END-->' +
                '        <!--验证手机号-->' +
                '        <section class="loginWidth" style="display: none; ">' +
                '            <section class="loginFixed">' +
                '                <section class="title">验证手机号</section>' +
                '                <section class="titleInput clear marginTop">' +
                '                    <div class="titleText">账号</div>' +
                '                    <input class="titleType" placeholder="请输入手机号" />' +
                '                </section>' +
                '                <section class="titleInput clear">' +
                '                    <div class="titleText">验证码</div>' +
                '                    <input class="titleType ev-phoneNum" placeholder="请输入验证码" />' +
                '                    <div class="validate"><!--获取验证码--><!--60s后重新获取-->重新获取</div>' +
                '                </section>' +
                '                <div class="loginBtn">下一步</div>' +
                '                <a class="returnText" href="javaScript:;">返回上一步</a>' +
                '            </section>' +
                '        </section>' +
                '        <!--验证手机号 END-->' +
                '        <!--设置新密码-->' +
                '        <section class="loginWidth ev-newPass" style="display: none;">' +
                '            <section class="loginFixed">' +
                '                <section class="title">设置新密码</section>' +
                '                <section class="titleInput clear marginTop">' +
                '                    <div class="titleText">新密码</div>' +
                '                    <input class="titleType ev-newPas" placeholder="请输入密码" />' +
                '                    <div class="phone"> ' +
                '                             <i class="close"></i>' +
                '                       </div>' +
                '                </section>' +
                '                <section class="titleInput clear">' +
                '                    <div class="titleText">确认密码</div>' +
                '                    <input class="titleType ev-conPas" placeholder="请输入密码" />' +
                '                    <div class="password"> ' +
                '                             <i class="close"></i>' +
                '                       </div>' +
                '                </section>' +
                '                <div class="loginBtn ev-passSave">保存</div>' +
                '                <a class="returnText ev-newReturn" href="javaScript:;">返回上一步</a>' +
                '            </section>' +
                '            <section class="reset">已重置</section>' +
                '        </section>' +
                '        <!--设置新密码 END-->' +
                '        <!--验证手机号-->' +
                '        <section class="loginWidth ev-testNum" style="display:none; ">' +
                '            <section class="loginFixed">' +
                '                <section class="return"></section>' +
                '                <section class="title">验证手机号</section>' +
                '                <section class="yanzheng">验证码已发送至：<span>15022322566</span></section>' +
                '                <section class="proving"><input type="text" class="error"/></section>' +
                '                <section class="send"><span>9</span>秒后重新发送</section>' +
                '                <section class="surplus">今天剩余<span>2</span>次</section>' +
                '            </section>' +
                '        </section>' +
                '        <!--验证手机号 END-->' +
                '        <!--手机快捷登录-->' +
                '        <section class="loginWidth ev-quickLogin" style="display:none; ">' +
                '            <section class="loginFixed">' +
                '                <section class="title">手机快捷登录</section>' +
                '                <section class="titleInput clear marginTop">' +
                '                    <div class="titleText">账号</div>' +
                '                    <input class="titleType ev-quiNum" placeholder="请输入手机号" />' +
                '                    <div class="phone"> ' +
                '                             <i class="close"></i>' +
                '                       </div>' +
                '                </section>' +
                '                <section class="titleInput clear">' +
                '                    <div class="titleText">验证码</div>' +
                '                    <input class="titleType ev-quiCode" placeholder="请输入验证码" />' +
                '                    <div class="validate ev-quickCode"><!--获取验证码--><!--60s后重新获取-->获取验证码</div>' +
                '                </section>' +
                '                <div class="loginBtn ev-quiLoginBtn ">登录</div>' +
                '                <a class="returnText ev-quickReturn" href="javaScript:;">返回上一步</a>' +
                '            </section>' +
                '        </section>' +
                '        <!--验证手机号 END-->' +
                '        <!--绑定手机号创建账号-->' +
                '        <section class="loginWidth ev-createBind" style="display: none;">' +
                '            <div class="yd_logo"><img src="/image/authority/login/yiding_logo.png" /></div>' +
                '            <div class="createAccount">使用13033333333创建医鼎账号</div>' +
                '            <div class="shortcut">之后您将可以使用手机号快捷登录医鼎</div>' +
                '            <div class="loginBtn ev-createAccount activation">创建账号</div>' +
                '            <div class="changeSigns ev-changeSigns">更换其他手机号</div>' +
                '            <a class="returnText ev-createReturn" href="javaScript:;">返回上一步</a>' +
                '        </section>' +
                '        <!--绑定手机号创建账号 END-->' +
                '        <!--唯医绑定医鼎账号-->' +
                '        <section class="loginWidth ev-bindAllin" style="display: none">' +
                '            <section class="loginFixed">' +
                '                <section class="return"></section>' +
                '                <section class="title">绑定医鼎账号</section>' +
                '                <section class="binding">绑定医鼎账号，可用唯医登录</section>' +
                '                <section class="titleInput clear marginTop">' +
                '                    <div class="titleText">账号</div>' +
                '                    <input class="titleType ev-bindNum" placeholder="请输入手机号" />' +
                '                    <div class="phone"> ' +
                '                             <i class="close"></i>' +
                '                       </div>' +
                '                </section>' +
                '                <section class="titleInput clear">' +
                '                    <div class="titleText">验证码</div>' +
                '                    <input class="titleType ev-bindCode" placeholder="请输入验证码" />' +
                '                    <div class="validate ev-bindValidate"><!--获取验证码--><!--60s后重新获取-->获取验证码</div>' +
                '                </section>' +
                '                <div class="loginBtn ev-bindLogin">登录</div>' +
                '                <a class="returnText ev-bindReturn" href="javaScript:;">返回上一步</a>' +
                '            </section>' +
                '        </section>' +
                '        <!--绑定医鼎账号 END-->' +
                '        <!--微信绑定医鼎账号-->' +
                '        <section class="loginWidth ev-bindWeixin" style="display: none">' +
                '            <section class="loginFixed">' +
                '                <section class="return"></section>' +
                '                <section class="title">绑定医鼎账号</section>' +
                '                <section class="binding">绑定医鼎账号,可用微信快速登录</section>' +
                '                <section class="titleInput clear marginTop">' +
                '                    <div class="titleText">账号</div>' +
                '                    <input class="titleType ev-bindWeixinNum" placeholder="请输入手机号" />' +
                '                    <div class="phone"> ' +
                '                             <i class="close"></i>' +
                '                       </div>' +
                '                </section>' +
                '                <section class="titleInput clear">' +
                '                    <div class="titleText">验证码</div>' +
                '                    <input class="titleType ev-bindWeixinCode" placeholder="请输入验证码" />' +
                '                    <div class="validate ev-bindWeixinValidate"><!--获取验证码--><!--60s后重新获取-->获取验证码</div>' +
                '                </section>' +
                '                <div class="loginBtn ev-bindWeixinLogin">登录</div>' +
                '                <a class="returnText ev-bindWeixinReturn" href="javaScript:;">返回上一步</a>' +
                '            </section>' +
                '        </section>' +
                '        <!--绑定医鼎账号 END-->' +
                '    </section>' +
                '</section>' +
                '<section class="loginMain" id="Ev-ydRegister" style="display:none;position:fixed;top:0;left:0;z-index:10">' +
                '    <section class="loginCont">' +
                '        <!--错误提示-->' +
                '        <section class="errorTip" style="display: none;"><span>密码错误</span></section>' +
                '        <!--注册-->' +
                '        <section class="loginWidth ev-register">' +
                '            <section class="loginFixed">' +
                '                <section class="title">注册</section>' +
                '                <section class="experiencePo ev-regClo"><img src="/image/authority/login/login_close.png"> </section>' +
                '                <section class="titleInput clear marginTop">' +
                '                    <div class="titleText">手机号</div>' +
                '                    <input class="titleType ev-regNum" placeholder="请输入手机号" />' +
                '                    <div class="phone" style="display: none;"> ' +
                '                       <i class="close"></i>' +
                '                    </div>' +
                '                </section>' +
                '                <section class="titleInput clear marginTop">' +
                '                    <div class="titleText">密码</div>' +
                '                    <input class="titleType ev-regPas" type="password" placeholder="请输入6位以上密码" /><div class="password" style="display: none;"> <i class="close"></i><i class="eyeClose"></i><i class="eyeOpen"></i></div>' +
                '                </section>' +
                '                <section class="titleInput clear">' +
                '                    <div class="titleText">验证码</div>' +
                '                    <input class="titleType ev-regCode" placeholder="请输入验证码" />' +
                '                    <div class="validate ev-regvalidate"><!--获取验证码--><!--60s后重新获取-->获取验证码</div>' +
                '                </section>' +
                '                <div class="loginBtn ev-regSave">注册</div>' +
                '                <a class="returnText" href="//www.yi-ding.net.cn/pages/authority/login.html">去登录</a>' +
                '            </section>' +
                '        </section>' +
                '    </section>' +
                '</section>');
        } else {
            $(".loginMain").show();
        }
    },
    hide: function() {
        $(".loginMain").hide();
    }
};
